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
    $releaseName = 'dekrey-dot-net',

    [String]
    $valuesFile = './deployment/values.prod.yaml'
)

Push-Location $PSScriptRoot
cd .\nextjs-frontend
$tag = (Get-Date).ToString('yyyy-MM-ddTHH_mm_ss')
$fullImageName = "$($repository).azurecr.io/$($imageName)"
docker build . -t "$($fullImageName):$tag"
az account set --subscription $($subscription)
az acr login --name $repository

docker push "$($fullImageName):$tag"

az aks get-credentials --resource-group $azureResourceGroup -n $azureAksCluster
helm upgrade --install -n $k8sNamespace $releaseName --create-namespace `
    --repo https://mdekrey.github.io/helm-charts single-container `
    --set-string "image.repository=$($fullImageName)" `
    --set-string "image.tag=$tag" `
    --values ./deployment/values.yaml --values $valuesFile

Pop-Location
