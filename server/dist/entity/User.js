var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { NewsPost } from './NewsPost.js';
let User = class User {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "user_id", void 0);
__decorate([
    Column({ unique: true, type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ default: false, type: 'boolean' }),
    __metadata("design:type", Boolean)
], User.prototype, "deleted", void 0);
__decorate([
    Column({ default: true, type: 'boolean' }),
    __metadata("design:type", Boolean)
], User.prototype, "sendNotification", void 0);
__decorate([
    Column({ type: 'text', default: 'log' }),
    __metadata("design:type", String)
], User.prototype, "notificationChannel", void 0);
__decorate([
    OneToMany(() => NewsPost, (newsPost) => newsPost.author),
    __metadata("design:type", Object)
], User.prototype, "newsPosts", void 0);
User = __decorate([
    Entity()
], User);
export { User };
