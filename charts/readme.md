DeKrey.Net has so far been manually deployed, sorry the "charts" folder was a tease.

# Basic namespace

    kubectl create namespace cert-manager
    kubectl apply --validate=false -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.14/deploy/manifests/00-crds.yaml
    helm repo add jetstack https://charts.jetstack.io  --version 0.14.0
    helm install --namespace cert-manager --name cert-manager jetstack/cert-manager
    helm install  --namespace nginx --name nginx stable/nginx-ingress

# DeKrey-Dot-Net namespace

    kubectl create namespace dekrey-dot-net

Setting up the container registry:

    az ad sp create-for-rbac --scopes /subscriptions/<Subscription ID>/resourcegroups/<ResourceGroup>/providers/Microsoft.ContainerRegistry/registries/<ContainerRegistry> --role Reader --name image-reader

Using the output there, then run this:

    kubectl create secret docker-registry <secret-name> --docker-server "<ContainerRegistry>.azurecr.io" --docker-username=<appId> --docker-password <password> -n dekrey-dot-net

Then:

    kubectl -n dekrey-dot-net apply -f ./templates/deployment.yaml
    kubectl -n dekrey-dot-net apply -f ./templates/ingress.yaml
    kubectl -n dekrey-dot-net apply -f ./templates/service.yaml
    kubectl -n dekrey-dot-net apply -f ./templates/production-issuer.yaml
    kubectl -n dekrey-dot-net apply -f ./templates/web-certificate.yaml

