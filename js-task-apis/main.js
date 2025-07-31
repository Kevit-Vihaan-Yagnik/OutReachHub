/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

            module.exports = require("@nestjs/core");

            /***/
}),
/* 2 */
/***/ ((module) => {

            module.exports = require("@nestjs/common");

            /***/
}),
/* 3 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.AppModule = void 0;
            const common_1 = __webpack_require__(2);
            const app_controller_1 = __webpack_require__(4);
            const app_service_1 = __webpack_require__(5);
            const typeorm_1 = __webpack_require__(6);
            const contacts_entity_1 = __webpack_require__(7);
            const auth_module_1 = __webpack_require__(9);
            const auth_entity_1 = __webpack_require__(13);
            const contacts_module_1 = __webpack_require__(19);
            let AppModule = class AppModule {
            };
            exports.AppModule = AppModule;
            exports.AppModule = AppModule = __decorate([
                (0, common_1.Module)({
                    imports: [
                        typeorm_1.TypeOrmModule.forRoot({
                            type: 'sqlite',
                            database: 'db',
                            entities: [contacts_entity_1.Contact, auth_entity_1.AuthToken],
                            synchronize: true,
                            autoLoadEntities: true,
                        }),
                        auth_module_1.AuthModule,
                        contacts_module_1.ContactsModule,
                    ],
                    controllers: [app_controller_1.AppController],
                    providers: [app_service_1.AppService],
                })
            ], AppModule);


            /***/
}),
/* 4 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            var _a;
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.AppController = void 0;
            const common_1 = __webpack_require__(2);
            const app_service_1 = __webpack_require__(5);
            let AppController = class AppController {
                appService;
                constructor(appService) {
                    this.appService = appService;
                }
                getHello() {
                    return this.appService.getHello();
                }
            };
            exports.AppController = AppController;
            __decorate([
                (0, common_1.Get)(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", String)
            ], AppController.prototype, "getHello", null);
            exports.AppController = AppController = __decorate([
                (0, common_1.Controller)(),
                __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
            ], AppController);


            /***/
}),
/* 5 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.AppService = void 0;
            const common_1 = __webpack_require__(2);
            let AppService = class AppService {
                getHello() {
                    return 'Hello World!';
                }
            };
            exports.AppService = AppService;
            exports.AppService = AppService = __decorate([
                (0, common_1.Injectable)()
            ], AppService);


            /***/
}),
/* 6 */
/***/ ((module) => {

            module.exports = require("@nestjs/typeorm");

            /***/
}),
/* 7 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            var _a;
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.Contact = void 0;
            const typeorm_1 = __webpack_require__(8);
            let Contact = class Contact {
                id;
                name;
                phoneNumber;
                tags;
                createdAt;
            };
            exports.Contact = Contact;
            __decorate([
                (0, typeorm_1.PrimaryGeneratedColumn)(),
                __metadata("design:type", Number)
            ], Contact.prototype, "id", void 0);
            __decorate([
                (0, typeorm_1.Column)(),
                __metadata("design:type", String)
            ], Contact.prototype, "name", void 0);
            __decorate([
                (0, typeorm_1.Column)(),
                __metadata("design:type", String)
            ], Contact.prototype, "phoneNumber", void 0);
            __decorate([
                (0, typeorm_1.Column)('json', { nullable: true }),
                __metadata("design:type", Array)
            ], Contact.prototype, "tags", void 0);
            __decorate([
                (0, typeorm_1.Column)('datetime', { default: () => 'CURRENT_TIMESTAMP' }),
                __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
            ], Contact.prototype, "createdAt", void 0);
            exports.Contact = Contact = __decorate([
                (0, typeorm_1.Entity)('contacts')
            ], Contact);


            /***/
}),
/* 8 */
/***/ ((module) => {

            module.exports = require("typeorm");

            /***/
}),
/* 9 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.AuthModule = void 0;
            const common_1 = __webpack_require__(2);
            const typeorm_1 = __webpack_require__(6);
            const jwt_1 = __webpack_require__(10);
            const auth_controller_1 = __webpack_require__(11);
            const auth_service_1 = __webpack_require__(12);
            const auth_guard_1 = __webpack_require__(16);
            const roles_guard_1 = __webpack_require__(17);
            const auth_entity_1 = __webpack_require__(13);
            let AuthModule = class AuthModule {
            };
            exports.AuthModule = AuthModule;
            exports.AuthModule = AuthModule = __decorate([
                (0, common_1.Module)({
                    imports: [
                        typeorm_1.TypeOrmModule.forFeature([auth_entity_1.AuthToken]),
                        jwt_1.JwtModule.register({
                            secret: 'your-secret-key-change-this-in-production',
                            signOptions: { expiresIn: '1h' },
                        }),
                    ],
                    controllers: [auth_controller_1.AuthController],
                    providers: [auth_service_1.AuthService, auth_guard_1.AuthGuard, roles_guard_1.RolesGuard],
                    exports: [auth_service_1.AuthService, auth_guard_1.AuthGuard, roles_guard_1.RolesGuard],
                })
            ], AuthModule);


            /***/
}),
/* 10 */
/***/ ((module) => {

            module.exports = require("@nestjs/jwt");

            /***/
}),
/* 11 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            var __param = (this && this.__param) || function (paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); }
            };
            var _a, _b, _c, _d;
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.AuthController = void 0;
            const common_1 = __webpack_require__(2);
            const auth_service_1 = __webpack_require__(12);
            const login_dto_1 = __webpack_require__(14);
            let AuthController = class AuthController {
                authService;
                constructor(authService) {
                    this.authService = authService;
                }
                async login(loginDto) {
                    return this.authService.login(loginDto);
                }
                async logout(authHeader) {
                    if (!authHeader || !authHeader.startsWith('Bearer ')) {
                        throw new common_1.UnauthorizedException('Authorization header is required');
                    }
                    const token = authHeader.substring(7);
                    return this.authService.logout(token);
                }
            };
            exports.AuthController = AuthController;
            __decorate([
                (0, common_1.Post)('login'),
                __param(0, (0, common_1.Body)()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [typeof (_b = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _b : Object]),
                __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
            ], AuthController.prototype, "login", null);
            __decorate([
                (0, common_1.Post)('logout'),
                __param(0, (0, common_1.Headers)('authorization')),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
            ], AuthController.prototype, "logout", null);
            exports.AuthController = AuthController = __decorate([
                (0, common_1.Controller)('auth'),
                __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
            ], AuthController);


            /***/
}),
/* 12 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            var __param = (this && this.__param) || function (paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); }
            };
            var _a, _b;
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.AuthService = void 0;
            const common_1 = __webpack_require__(2);
            const typeorm_1 = __webpack_require__(6);
            const typeorm_2 = __webpack_require__(8);
            const jwt_1 = __webpack_require__(10);
            const auth_entity_1 = __webpack_require__(13);
            let AuthService = class AuthService {
                authTokenRepository;
                jwtService;
                VALID_USERS = [
                    { username: 'editor', password: 'editor', role: 'editor' },
                    { username: 'viewer', password: 'viewer', role: 'viewer' }
                ];
                constructor(authTokenRepository, jwtService) {
                    this.authTokenRepository = authTokenRepository;
                    this.jwtService = jwtService;
                }
                async login(loginDto) {
                    const { username, password } = loginDto;
                    const validUser = this.VALID_USERS.find(user => user.username === username && user.password === password);
                    if (!validUser) {
                        throw new common_1.UnauthorizedException('Invalid credentials');
                    }
                    await this.authTokenRepository.delete({ username });
                    const payload = { username, role: validUser.role, sub: username };
                    const access_token = this.jwtService.sign(payload);
                    const expiresAt = new Date();
                    expiresAt.setHours(expiresAt.getHours() + 1);
                    const authToken = this.authTokenRepository.create({
                        token: access_token,
                        username,
                        role: validUser.role,
                        expiresAt,
                    });
                    await this.authTokenRepository.save(authToken);
                    return {
                        access_token,
                        expires_in: 3600,
                        message: 'Login successful',
                    };
                }
                async logout(token) {
                    const result = await this.authTokenRepository.delete({ token });
                    if (result.affected === 0) {
                        throw new common_1.UnauthorizedException('Invalid token');
                    }
                    return {
                        message: 'Logout successful',
                    };
                }
                async validateToken(token) {
                    try {
                        const payload = this.jwtService.verify(token);
                        const authToken = await this.authTokenRepository.findOne({
                            where: { token },
                        });
                        if (!authToken) {
                            throw new common_1.UnauthorizedException('Token not found');
                        }
                        if (authToken.expiresAt < new Date()) {
                            await this.authTokenRepository.delete({ token });
                            throw new common_1.UnauthorizedException('Token expired');
                        }
                        return payload;
                    }
                    catch (error) {
                        throw new common_1.UnauthorizedException('Invalid token');
                    }
                }
                async removeExpiredTokens() {
                    await this.authTokenRepository
                        .createQueryBuilder()
                        .delete()
                        .where('expiresAt < :now', { now: new Date() })
                        .execute();
                }
            };
            exports.AuthService = AuthService;
            exports.AuthService = AuthService = __decorate([
                (0, common_1.Injectable)(),
                __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.AuthToken)),
                __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
            ], AuthService);


            /***/
}),
/* 13 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            var _a, _b;
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.AuthToken = void 0;
            const typeorm_1 = __webpack_require__(8);
            let AuthToken = class AuthToken {
                id;
                token;
                username;
                role;
                createdAt;
                expiresAt;
            };
            exports.AuthToken = AuthToken;
            __decorate([
                (0, typeorm_1.PrimaryGeneratedColumn)(),
                __metadata("design:type", Number)
            ], AuthToken.prototype, "id", void 0);
            __decorate([
                (0, typeorm_1.Column)({ unique: true }),
                __metadata("design:type", String)
            ], AuthToken.prototype, "token", void 0);
            __decorate([
                (0, typeorm_1.Column)(),
                __metadata("design:type", String)
            ], AuthToken.prototype, "username", void 0);
            __decorate([
                (0, typeorm_1.Column)(),
                __metadata("design:type", String)
            ], AuthToken.prototype, "role", void 0);
            __decorate([
                (0, typeorm_1.CreateDateColumn)(),
                __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
            ], AuthToken.prototype, "createdAt", void 0);
            __decorate([
                (0, typeorm_1.Column)({ type: 'datetime' }),
                __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
            ], AuthToken.prototype, "expiresAt", void 0);
            exports.AuthToken = AuthToken = __decorate([
                (0, typeorm_1.Entity)('auth_tokens')
            ], AuthToken);


            /***/
}),
/* 14 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.LoginDto = void 0;
            const class_validator_1 = __webpack_require__(15);
            class LoginDto {
                username;
                password;
            }
            exports.LoginDto = LoginDto;
            __decorate([
                (0, class_validator_1.IsNotEmpty)(),
                (0, class_validator_1.IsString)(),
                __metadata("design:type", String)
            ], LoginDto.prototype, "username", void 0);
            __decorate([
                (0, class_validator_1.IsNotEmpty)(),
                (0, class_validator_1.IsString)(),
                __metadata("design:type", String)
            ], LoginDto.prototype, "password", void 0);


            /***/
}),
/* 15 */
/***/ ((module) => {

            module.exports = require("class-validator");

            /***/
}),
/* 16 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            var _a;
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.AuthGuard = void 0;
            const common_1 = __webpack_require__(2);
            const auth_service_1 = __webpack_require__(12);
            let AuthGuard = class AuthGuard {
                authService;
                constructor(authService) {
                    this.authService = authService;
                }
                async canActivate(context) {
                    const request = context.switchToHttp().getRequest();
                    const authHeader = request.headers.authorization;
                    if (!authHeader || !authHeader.startsWith('Bearer ')) {
                        throw new common_1.UnauthorizedException('Authorization header is required');
                    }
                    const token = authHeader.substring(7);
                    try {
                        const payload = await this.authService.validateToken(token);
                        request.user = payload;
                        return true;
                    }
                    catch (error) {
                        throw new common_1.UnauthorizedException('Invalid or expired token');
                    }
                }
            };
            exports.AuthGuard = AuthGuard;
            exports.AuthGuard = AuthGuard = __decorate([
                (0, common_1.Injectable)(),
                __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
            ], AuthGuard);


            /***/
}),
/* 17 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            var _a, _b;
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.RolesGuard = void 0;
            const common_1 = __webpack_require__(2);
            const core_1 = __webpack_require__(1);
            const auth_guard_1 = __webpack_require__(16);
            const roles_decorator_1 = __webpack_require__(18);
            let RolesGuard = class RolesGuard {
                reflector;
                authGuard;
                constructor(reflector, authGuard) {
                    this.reflector = reflector;
                    this.authGuard = authGuard;
                }
                async canActivate(context) {
                    const isAuthenticated = await this.authGuard.canActivate(context);
                    if (!isAuthenticated) {
                        return false;
                    }
                    const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
                        context.getHandler(),
                        context.getClass(),
                    ]);
                    if (!requiredRoles) {
                        return true;
                    }
                    const request = context.switchToHttp().getRequest();
                    const user = request.user;
                    const hasRole = requiredRoles.includes(user.role);
                    if (!hasRole) {
                        throw new common_1.ForbiddenException('Insufficient permissions');
                    }
                    return true;
                }
            };
            exports.RolesGuard = RolesGuard;
            exports.RolesGuard = RolesGuard = __decorate([
                (0, common_1.Injectable)(),
                __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof auth_guard_1.AuthGuard !== "undefined" && auth_guard_1.AuthGuard) === "function" ? _b : Object])
            ], RolesGuard);


            /***/
}),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.Roles = exports.ROLES_KEY = void 0;
            const common_1 = __webpack_require__(2);
            exports.ROLES_KEY = 'roles';
            const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
            exports.Roles = Roles;


            /***/
}),
/* 19 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.ContactsModule = void 0;
            const common_1 = __webpack_require__(2);
            const typeorm_1 = __webpack_require__(6);
            const contacts_controller_1 = __webpack_require__(20);
            const contacts_service_1 = __webpack_require__(21);
            const contacts_entity_1 = __webpack_require__(7);
            const auth_module_1 = __webpack_require__(9);
            let ContactsModule = class ContactsModule {
            };
            exports.ContactsModule = ContactsModule;
            exports.ContactsModule = ContactsModule = __decorate([
                (0, common_1.Module)({
                    imports: [
                        typeorm_1.TypeOrmModule.forFeature([contacts_entity_1.Contact]),
                        auth_module_1.AuthModule,
                    ],
                    controllers: [contacts_controller_1.ContactsController],
                    providers: [contacts_service_1.ContactsService],
                    exports: [contacts_service_1.ContactsService],
                })
            ], ContactsModule);


            /***/
}),
/* 20 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            var __param = (this && this.__param) || function (paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); }
            };
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.ContactsController = void 0;
            const common_1 = __webpack_require__(2);
            const contacts_service_1 = __webpack_require__(21);
            const get_contacts_query_dto_1 = __webpack_require__(23);
            const roles_guard_1 = __webpack_require__(17);
            const roles_decorator_1 = __webpack_require__(18);
            let ContactsController = class ContactsController {
                contactsService;
                constructor(contactsService) {
                    this.contactsService = contactsService;
                }
                async getAllContacts(queryDto) {
                    return this.contactsService.getAllContacts(queryDto);
                }
                async getContactById(id) {
                    console.log(`Fetching contact with ID: ${id}`);
                    return this.contactsService.getContactById(id);
                }
                async createContact(contactData) {
                    return this.contactsService.createContact(contactData);
                }
                async updateContact(id, contactData) {
                    return this.contactsService.updateContact(id, contactData);
                }
                async deleteContact(id) {
                    return this.contactsService.deleteContact(id);
                }
            };
            exports.ContactsController = ContactsController;
            __decorate([
                (0, common_1.Get)(),
                (0, roles_decorator_1.Roles)('editor', 'viewer'),
                __param(0, (0, common_1.Query)()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [typeof (_b = typeof get_contacts_query_dto_1.GetContactsQueryDto !== "undefined" && get_contacts_query_dto_1.GetContactsQueryDto) === "function" ? _b : Object]),
                __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
            ], ContactsController.prototype, "getAllContacts", null);
            __decorate([
                (0, common_1.Get)(':id'),
                (0, roles_decorator_1.Roles)('editor', 'viewer'),
                __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
            ], ContactsController.prototype, "getContactById", null);
            __decorate([
                (0, common_1.Post)(),
                (0, roles_decorator_1.Roles)('editor'),
                __param(0, (0, common_1.Body)()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [typeof (_e = typeof Partial !== "undefined" && Partial) === "function" ? _e : Object]),
                __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
            ], ContactsController.prototype, "createContact", null);
            __decorate([
                (0, common_1.Put)(':id'),
                (0, roles_decorator_1.Roles)('editor'),
                __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
                __param(1, (0, common_1.Body)()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number, typeof (_g = typeof Partial !== "undefined" && Partial) === "function" ? _g : Object]),
                __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
            ], ContactsController.prototype, "updateContact", null);
            __decorate([
                (0, common_1.Delete)(':id'),
                (0, roles_decorator_1.Roles)('editor'),
                __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
            ], ContactsController.prototype, "deleteContact", null);
            exports.ContactsController = ContactsController = __decorate([
                (0, common_1.Controller)('contacts'),
                (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
                __metadata("design:paramtypes", [typeof (_a = typeof contacts_service_1.ContactsService !== "undefined" && contacts_service_1.ContactsService) === "function" ? _a : Object])
            ], ContactsController);


            /***/
}),
/* 21 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            var __param = (this && this.__param) || function (paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); }
            };
            var _a;
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.ContactsService = void 0;
            const common_1 = __webpack_require__(2);
            const typeorm_1 = __webpack_require__(6);
            const typeorm_2 = __webpack_require__(8);
            const contacts_entity_1 = __webpack_require__(7);
            const paginated_contacts_response_dto_1 = __webpack_require__(22);
            let ContactsService = class ContactsService {
                contactRepository;
                constructor(contactRepository) {
                    this.contactRepository = contactRepository;
                }
                async getContactById(id) {
                    const contact = await this.contactRepository.findOne({
                        where: { id },
                    });
                    if (!contact) {
                        throw new common_1.NotFoundException(`Contact with ID ${id} not found`);
                    }
                    return contact;
                }
                async getAllContacts(queryDto) {
                    const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc' } = queryDto;
                    const [contacts, total] = await this.contactRepository.findAndCount({
                        order: { [sortBy]: sortOrder },
                        skip: (page - 1) * limit,
                        take: limit,
                    });
                    return new paginated_contacts_response_dto_1.PaginatedContactsResponseDto(contacts, total, page, limit);
                }
                async createContact(contactData) {
                    const contact = this.contactRepository.create(contactData);
                    return this.contactRepository.save(contact);
                }
                async updateContact(id, contactData) {
                    await this.getContactById(id);
                    await this.contactRepository.update(id, contactData);
                    return this.getContactById(id);
                }
                async deleteContact(id) {
                    const contact = await this.getContactById(id);      
                    await this.contactRepository.remove(contact);
                }
            };
            exports.ContactsService = ContactsService;
            exports.ContactsService = ContactsService = __decorate([
                (0, common_1.Injectable)(),
                __param(0, (0, typeorm_1.InjectRepository)(contacts_entity_1.Contact)),
                __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
            ], ContactsService);


            /***/
}),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.PaginatedContactsResponseDto = void 0;
            class PaginatedContactsResponseDto {
                data;
                total;
                page;
                limit;
                totalPages;
                hasNext;
                hasPrev;
                constructor(data, total, page, limit) {
                    this.data = data;
                    this.total = total;
                    this.page = page;
                    this.limit = limit;
                    this.totalPages = Math.ceil(total / limit);
                    this.hasNext = page < this.totalPages;
                    this.hasPrev = page > 1;
                }
            }
            exports.PaginatedContactsResponseDto = PaginatedContactsResponseDto;


            /***/
}),
/* 23 */
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {


            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };
            Object.defineProperty(exports, "__esModule", ({ value: true }));
            exports.GetContactsQueryDto = void 0;
            const class_transformer_1 = __webpack_require__(24);
            const class_validator_1 = __webpack_require__(15);
            class GetContactsQueryDto {
                page = 1;
                limit = 10;
                sortBy = 'id';
                sortOrder = 'asc';
            }
            exports.GetContactsQueryDto = GetContactsQueryDto;
            __decorate([
                (0, class_validator_1.IsOptional)(),
                (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
                (0, class_validator_1.IsNumber)(),
                (0, class_validator_1.Min)(1),
                __metadata("design:type", Number)
            ], GetContactsQueryDto.prototype, "page", void 0);
            __decorate([
                (0, class_validator_1.IsOptional)(),
                (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
                (0, class_validator_1.IsNumber)(),
                (0, class_validator_1.Min)(1),
                __metadata("design:type", Number)
            ], GetContactsQueryDto.prototype, "limit", void 0);
            __decorate([
                (0, class_validator_1.IsOptional)(),
                (0, class_validator_1.IsString)(),
                (0, class_validator_1.IsIn)(['id', 'name', 'phoneNumber', 'createdAt']),
                __metadata("design:type", String)
            ], GetContactsQueryDto.prototype, "sortBy", void 0);
            __decorate([
                (0, class_validator_1.IsOptional)(),
                (0, class_validator_1.IsString)(),
                (0, class_validator_1.IsIn)(['asc', 'desc']),
                __metadata("design:type", String)
            ], GetContactsQueryDto.prototype, "sortOrder", void 0);


            /***/
}),
/* 24 */
/***/ ((module) => {

            module.exports = require("class-transformer");

            /***/
})
/******/]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
    (() => {
        var exports = __webpack_exports__;

        Object.defineProperty(exports, "__esModule", ({ value: true }));
        const core_1 = __webpack_require__(1);
        const common_1 = __webpack_require__(2);
        const app_module_1 = __webpack_require__(3);
        async function bootstrap() {
            const app = await core_1.NestFactory.create(app_module_1.AppModule);

            app.enableCors({
                origin: '*',
                credentials: true,
            });
            app.useGlobalPipes(new common_1.ValidationPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
            }));
            await app.listen(process.env.PORT ?? 3000);
        }
        bootstrap();

    })();

    /******/
})()
    ;