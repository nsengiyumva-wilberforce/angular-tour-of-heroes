import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CrisisService } from '../crisis.service';
import { Router } from '@angular/router';
import { Crisis } from '../crisis';
import { DialogueService } from 'src/app/dialogue.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;
  editName = '';
  selectedId = 0;

  constructor( private actRoute: ActivatedRoute,
               private route: Router,
               private location: Location,
               private crisisService: CrisisService,
               public dialogService: DialogueService) { }

  ngOnInit(): void {
    this.getCrisisDetail();
  }

  getCrisisDetail(): void{
    const id = Number(this.actRoute.snapshot.paramMap.get('id'));
    this.crisisService.getCrisis(id).subscribe(crisis => this.crisis = crisis);
  }

  goBack(): void{
    this.location.back();
  }
  gotoCrisis(crisis: Crisis): void{
    const crisisId = crisis ? this.crisis.id : null;
    this.route.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.actRoute });
  }
  cancel(crisis: Crisis): void{
   this.gotoCrisis(crisis);
  }
  editCrisis(): void{
    if (this.crisis){
      this.crisisService.updateCrisis(this.crisis)
        .subscribe(() => this.goBack());
    }
  }
  save(crisis: Crisis): void{
    this.crisis.name = this.editName;
    this.gotoCrisis(crisis);
  }
}
