Push-Location $PSScriptRoot
cd .\gatsby-frontend
npm run build-docker
az acr login --name dekreydotnet
docker push dekreydotnet.azurecr.io/dekreydotnet:latest
kubectl -n dekrey-dot-net set image deployment dekrey-dot-net web=$(docker inspect --format='{{index .RepoDigests 0}}' dekreydotnet.azurecr.io/dekreydotnet:latest)
Pop-Location
