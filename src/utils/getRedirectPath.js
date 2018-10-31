export function getRedirectPath({gender, avatar}){
    let path = gender === 'male' ? '/mine/man' : '/mine/women';
    if(!avatar){
        path += '/info'
    }
    return path
}