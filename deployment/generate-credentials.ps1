param (
    [String]
    $subscription = '2351fc7a-207c-4a7d-8104-d5fe21d7907f',
    [String]
    $azureResourceGroup = 'DeKreyDotNet',

    [String]
    $appName = 'DeKreyDotNet-GitHub-Actions'
)

# see https://aka.ms/create-secrets-for-GitHub-workflows
# version when written: https://github.com/Azure/actions-workflow-samples/blob/9a151eaa180e20378c308bcb24a3dcad7d49f22c/assets/create-secrets-for-GitHub-workflows.md
$details = az ad sp create-for-rbac --name "$appName" --role contributor --scopes /subscriptions/$($subscription)/resourceGroups/$azureResourceGroup --sdk-auth | ConvertFrom-Json

# order is alphabetical to reflect what it shows in github, each key is its own secret
@{
    AZURE_CREDENTIALS = $details
    REGISTRY_PASSWORD = $($details.clientSecret)
    REGISTRY_USERNAME = $($details.clientId)
} | ConvertTo-Json
