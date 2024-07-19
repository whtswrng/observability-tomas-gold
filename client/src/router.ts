export const getOrgRoute = (orgId: string) => {
    return `/org/${orgId}`
}

export const getHostsRoute = (orgId: string) => {
    return `/org/${orgId}/entities/hosts`
}

export const getHostDetailsRoute = (orgId: string, hostId: string) => {
    return `/org/${orgId}/entities/hosts/${hostId}`
}