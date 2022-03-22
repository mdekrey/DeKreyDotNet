param (
    [String]
    $subscription = '2351fc7a-207c-4a7d-8104-d5fe21d7907f',

    [String]
    $repository = 'dekreydotnet',
    [String]
    $imageName = 'dekreydotnet',

    [String]
    $azureResourceGroup = 'DeKreyDotNet',
    [String]
    $azureAksCluster = 'TinyKubed',

    [String]
    $k8sNamespace = 'dekrey-dot-net',
    [String]
    $chartName = 'dekrey-dot-net'
)

Push-Location $PSScriptRoot
cd .\nextjs-frontend
$tag = (Get-Date).ToString('yyyy-MM-ddTHH_mm_ss')
$fullImageName = "$($repository).azurecr.io/$($imageName)"
docker build . -t "$($fullImageName):$tag"
az account set --subscription $($subscription)
az acr login --name $repository

docker push "$($fullImageName):$tag"

$sslClusterIssuer = 'letsencrypt'

az aks get-credentials --resource-group $azureResourceGroup -n $azureAksCluster
helm upgrade --install -n $k8sNamespace $chartName --create-namespace mdekrey/single-container `
    --set-string "image.repository=$($fullImageName)" `
    --set-string "image.tag=$tag,image.pullPolicy=Always" `
    --set-string "ingress.annotations.cert-manager\.io/cluster-issuer=$sslClusterIssuer" `
    --set-string "ingress.hosts[0].host=dekrey.net" `
    --set-string "ingress.hosts[1].host=www.dekrey.net"

Pop-Location
