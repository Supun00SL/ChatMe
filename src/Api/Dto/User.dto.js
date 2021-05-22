
export default class UserDto {
    constructor(obj) {
        if (obj != null) {
            this.online = obj.online
            this.password = obj.password
            this.level = obj.level
            this.rank = obj.rank
        }
    }

    fillObj(username,obj) {
        if (obj != null) {
            this.online = obj.online
            this.level = obj.level
            this.rank = obj.rank
            this.username = username
        }
    }
}