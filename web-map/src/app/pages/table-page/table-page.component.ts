import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  pageIndex: number = 0

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.queryParams.subscribe(params => {
      this.pageIndex = params['page']
    })
    this.apiService.getTableData().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  openMapPage(row: LandRegistryTitle) {
    console.log(row)
    this.router.navigateByUrl('/map')
  }

  changePage(event: PageEvent) {
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: { page: event.pageIndex }});
  }
}
