
export default class MessageDto {
    constructor(obj) {
        if (obj != null) {
            this.text = obj.text
            this.createdAt = obj.createdAt
            this.user = obj.user._id
        }
    }

}