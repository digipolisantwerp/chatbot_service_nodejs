import { OAuthConfig } from '../auth';

export interface ServiceConfig extends OAuthConfig {
    serviceUrl: string
}

export interface ContactItem {
    id: string,
    name: string,
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    domain?: string,
    avatarUrl?: string
}

export interface MprofielAdminResult {
    success: boolean,
    data: Array<MprofielAdminResultItem>
}

export interface MprofielAdminResultItem {
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    domain: string,
    avatarUrl: string,
    emailWork: string
}
