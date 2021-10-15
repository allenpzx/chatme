const model = require("./model")
// @ponicode
describe("model.getModel", () => {
    test("0", () => {
        let callFunction = () => {
            model.getModel("Anas")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            model.getModel("Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            model.getModel("Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            model.getModel("Pierre Edouard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            model.getModel("George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            model.getModel(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
