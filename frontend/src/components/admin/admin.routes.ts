import { Routes }                  from '@angular/router';

import { AdminHomeComponent }      from './adminHome.component';
import { AdminOverviewComponent }  from './adminOverview.component';
import { AdminTutorialsComponent } from './adminTutorials.component';
import { AdminMembersComponent }   from './adminMembers.component';
import { AdminUsersComponent }     from './adminUsers.component';
import { CoachesAreaComponent }    from './adminCoachesArea.component';
import { EditMemberComponent }     from './member/editMember.component';

export const adminRoutes: Routes = [
	{ path: 'adminHome',      component: AdminHomeComponent },
	{ path: 'adminOverview',  component: AdminOverviewComponent },
	{ path: 'adminTutorials', component: AdminTutorialsComponent },
	{ path: 'members',        component: AdminMembersComponent },
	{ path: 'users',          component: AdminUsersComponent },
	{ path: 'coachesArea',    component: CoachesAreaComponent },
	{ path: 'editMember',     component: EditMemberComponent }
];
