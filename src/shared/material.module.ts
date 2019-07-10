import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTooltipModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        MatPaginatorModule,
        MatTooltipModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        MatPaginatorModule,
        MatTooltipModule
    ]
})
export class MaterialModule {}