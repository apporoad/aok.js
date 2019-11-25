

```bash

kubectl get storageClass

helm install . --dry-run --debug --set persistence.enabled=true,persistence.storageClass="xxxxxx",ingress.enabled=true

```