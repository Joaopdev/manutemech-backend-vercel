"use strict";
// entities/CategoryEntity.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryEntity = void 0;
class CategoryEntity {
    constructor(prismaCategory) {
        this.prismaCategory = prismaCategory;
    }
    get id() {
        return this.prismaCategory.id;
    }
    get name() {
        return this.prismaCategory.name;
    }
}
exports.CategoryEntity = CategoryEntity;
