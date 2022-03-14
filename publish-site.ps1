Push-Location $PSScriptRoot
cd .\gatsby-frontend
npm run build-docker
az acr login --name dekreydotnet
docker push dekreydotnet.azurecr.io/dekreydotnet:latest

$fullImageName = 'dekreydotnet.azurecr.io/dekreydotnet'
$imageTag = 'latest'
$sslClusterIssuer = 'letsencrypt'

helm upgrade --install -n dekrey-dot-net dekrey-dot-net --create-namespace mdekrey/single-container `
    --set-string "image.repository=$($fullImageName)" `
    --set-string "image.tag=$imageTag,image.pullPolicy=Always" `
    --set-string "ingress.annotations.cert-manager\.io/cluster-issuer=$sslClusterIssuer" `
    --set-string "ingress.hosts[0].host=dekrey.net" `
    --set-string "ingress.hosts[1].host=www.dekrey.net"

Pop-Location
