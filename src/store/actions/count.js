export const add = number => ({
    type: 'ADD_NUMBER',
    number
})

export const subtract = number => ({
    type: 'SUBTRACT_NUMBER',
    number
})

export const delayAdd = dispatch => number => {
    setTimeout(()=>{
        dispatch({
            type: 'ADD_NUMBER',
            number
        })
    }, 1000);
}