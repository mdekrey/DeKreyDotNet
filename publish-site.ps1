Push-Location $PSScriptRoot
cd .\nextjs-frontend
$tag = (Get-Date).ToString('yyyy-MM-ddTHH_mm_ss')
docker build . -t dekreydotnet.azurecr.io/dekreydotnet:$tag
az acr login --name dekreydotnet

docker push dekreydotnet.azurecr.io/dekreydotnet:$tag

$fullImageName = 'dekreydotnet.azurecr.io/dekreydotnet'
$sslClusterIssuer = 'letsencrypt'

helm upgrade --install -n dekrey-dot-net dekrey-dot-net --create-namespace mdekrey/single-container `
    --set-string "image.repository=$($fullImageName)" `
    --set-string "image.tag=$tag,image.pullPolicy=Always" `
    --set-string "ingress.annotations.cert-manager\.io/cluster-issuer=$sslClusterIssuer" `
    --set-string "ingress.hosts[0].host=dekrey.net" `
    --set-string "ingress.hosts[1].host=www.dekrey.net"

Pop-Location
