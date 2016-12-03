import { Gulpclass, Task } from "gulpclass/Decorators";

const gulp = require("gulp");
const del = require("del");

@Gulpclass()
export class Gulpfile {

    @Task()
    clean(cb: Function) {
        return del(["./dist/**"], cb);
    }

}
