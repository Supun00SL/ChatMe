
export default class ChatDto {
    constructor(id, obj) {
        if (obj != null) {
            this._id = id
            this.text = obj.text
            this.createdAt = obj.createdAt.toDate()

            var user = {}
            if (obj.user) {
                user._id = obj.user
                user.name = obj.user

                this.user = user
            }
        }
    }

}