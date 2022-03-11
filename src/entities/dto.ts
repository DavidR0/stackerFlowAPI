
export interface questionDTO{
    questionId?: number,
    userId?: number,
    author?: string,
    title?: string,
    content?: string,
    creationTime?: Date;
    voteCount?: number;
};

export interface sessionDTO{
    id?: number,
    jwtToken?: string,
    valid?: boolean
    userId?: number,
};

export interface userDTO{
    userName?: string,
    email?: string,
    password?: string,
    type?: "User" | "Admin" ;
    userID?: number,
    banned?: boolean
    twoFact?: boolean,
    score?: number,
    privateKey?: string,
};