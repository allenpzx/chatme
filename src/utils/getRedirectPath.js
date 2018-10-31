export function getRedirectPath({gender, avatar}){
    console.log(gender, avatar)
    let path = gender === 'male' ? '/man' : '/women';
    if(!avatar){
        path += '/info'
    }
    return path
}