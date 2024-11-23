import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class Utils {
    static getUserIdOrDefault(): number {
        let id = localStorage.getItem('user_id');

        let retId = 0;
        if (id) {
            if (!isNaN(Number(id))) {
                retId = Number(id);
            }
        }

        return retId;
    }
}