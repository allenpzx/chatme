export function getRedirectPath({gender, avatar}){
    let path = gender === 'male' ? '/me' : '/me';
    if(!avatar){
        path += '/info'
    }
    return path
}