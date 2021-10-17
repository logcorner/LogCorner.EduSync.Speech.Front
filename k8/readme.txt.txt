INGRESS WITH HELM  ==> 

helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo add stable https://charts.helm.sh/stable


helm install ingress stable/nginx-ingress

kubectl get pods


INGRESS WITH MANIFEST ==>

k apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml
 