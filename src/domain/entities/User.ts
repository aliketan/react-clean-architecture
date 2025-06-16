import type { IEntity } from "../contracts/IEntity";
import type { Album } from "./Album";
import type { Post } from "./Post";
import type { Todo } from "./Todo";

export interface User extends IEntity {
    userId: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: Address;
    company: Company;
    todo:Todo[],
    album:Album[],
    post:Post[]
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}