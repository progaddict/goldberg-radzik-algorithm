import { Gulpclass, Task } from "gulpclass/Decorators";

let gulp = require("gulp");
let del = require("del");

@Gulpclass()
export class Gulpfile {

    @Task()
    clean(cb: Function) {
        return del(["./dist/**"], cb);
    }

}
