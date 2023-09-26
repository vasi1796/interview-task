import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LandRegistryTitle } from 'src/app/models/LandRegistryTitle';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent {
  @ViewChild(MatSort, { static: false }) sort!: MatSort
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatPaginator, { static: false }) paginatorPageSize!: MatPaginator

  dataSource = new MatTableDataSource<LandRegistryTitle>()

  columnsToDisplay = [{
    tableTitle: 'Title number',
    prop: 'title_no'
    },{
      tableTitle: 'Class of Title',
      prop: 'tenure'
    }
  ]
  displayProps = ['title_no','tenure']

  constructor(
    private apiService: ApiService,
    private router: Router
  ){
    this.apiService.getTableData().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  openMapPage(row: any) {
    console.log(row)
    this.router.navigateByUrl('/map')
  }
}
