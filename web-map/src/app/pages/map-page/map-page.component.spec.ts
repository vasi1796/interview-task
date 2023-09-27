import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapPageComponent } from './map-page.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips'
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MapService } from '../../services/map.service';
import { of } from 'rxjs';

describe('MapPageComponent', () => {
  let component: MapPageComponent;
  let fixture: ComponentFixture<MapPageComponent>;
  let mockApiService: Partial<ApiService>;
  let mockMapService: Partial<MapService>;
  let mockLocation: Partial<Location>;

  beforeEach(async () => {
    mockApiService = {
      getTableData: jest.fn().mockReturnValue(of([
        // ... (include your mock data here or a smaller subset if desired)
      ]))
    };

    mockMapService = {
      setView: jest.fn(),
      setTarget: jest.fn()
    };

    mockLocation = {
      back: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [MapPageComponent],
      imports: [
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: MapService, useValue: mockMapService },
        { provide: Location, useValue: mockLocation }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call back function from location service on routeBack', () => {
    component.routeBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should set map target on init', () => {
    expect(mockMapService.setTarget).toHaveBeenCalledWith('map');
  });
});
