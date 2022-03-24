param (
    [String]
    $subscription = '2351fc7a-207c-4a7d-8104-d5fe21d7907f',
    [String]
    $azureResourceGroup = 'DeKreyDotNet',

    [String]
    $appName = 'DeKreyDotNet-GitHub-Actions'
)

$details = az ad sp create-for-rbac --name "$appName" --role contributor --scopes /subscriptions/$($subscription)/resourceGroups/$azureResourceGroup | ConvertFrom-Json

@{
    AZURE_CREDENTIALS = $details
    REGISTRY_USERNAME = $($details.appId)
    REGISTRY_PASSWORD = $($details.tenant)
} | ConvertTo-Json
