import { Component, OnInit } from '@angular/core';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { MessageService } from 'src/app/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[] = [];
  selectedId = 0;
    constructor( private crisisService: CrisisService,
                 private messageService: MessageService,
                 private route: ActivatedRoute) { }
    ngOnInit(): void {
      this.getSelectedId();
      this.getCrises();
    }
    getCrises(): void{
      this.crisisService.getCrises().subscribe(Crises => this.crises = Crises);
    }
    add(name: string): void{
      name = name.trim();
      if (!name){
        return;
      }
      this.crisisService.addCrisis({name} as Crisis)
        .subscribe(crisis => {
          this.crises.push(crisis);
        });
    }
    delete(crisis: Crisis): void{
      this.crises = this.crises.filter(h => h !== crisis);
      this.crisisService.deleteCrisis(crisis.id).subscribe();
    }
    getSelectedId(): void{
      this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    }
}
