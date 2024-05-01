import { Pet } from "./pet";

export class User {
    firstName!: string;
    lastName!: string;
    uid!: string;
    email!: string | null;
    userImage!: string | null;
    preferences!: any;

    constructor(firstName: string,  lastName: string, uid: string, email: string | null, userImage: string | null, preferences: any) {
        this.firstName = firstName;
        this.uid = uid;
        this.lastName = lastName;
        this.email = email;
        this.userImage = userImage;
        this.preferences = preferences;
    }
}

