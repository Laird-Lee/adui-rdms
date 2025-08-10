import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const BaseRoute: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/test',
    children: [
      {
        path: '/test',
        name: 'test',
        meta: {
          icon: 'test',
          title: { zh: '测试', en: 'Test' },
        },
        component: () => import('@/views/test/index.vue'),
      },
      // 项目管理
      {
        path: '/project',
        name: 'project',
        meta: {
          icon: 'user',
          title: { zh: '项目管理', en: 'Project Management' },
        },
        redirect: '/project/list',
        children: [
          {
            path: 'list',
            name: 'project-list',
            meta: {
              icon: 'user',
              title: { zh: '项目列表', en: 'Project List' },
            },
            redirect: '/project/list/view-project',
            children: [
              {
                path: 'view-project',
                name: 'view-project',
                meta: { icon: 'user', title: { zh: '查看项目', en: 'View Project' } },
                component: () => import('@/views/project/list/view-project/index.vue'),
              },
              {
                path: 'create-project',
                name: 'create-project',
                meta: { title: { zh: '新建项目', en: 'Create Project' } },
                component: () => import('@/views/project/list/create-project/index.vue'),
              },
              {
                path: 'project-approval',
                name: 'project-approval',
                meta: { title: { zh: '项目审批', en: 'Project Approval' } },
                component: () => import('@/views/project/list/project-approval/index.vue'),
              },
            ],
          },
          {
            path: 'plan',
            name: 'project-plan',
            meta: { title: { zh: '项目计划', en: 'Project Plan' } },
            redirect: '/project/plan/gantt',
            children: [
              {
                path: 'gantt',
                name: 'gantt',
                meta: { title: { zh: '甘特图', en: 'Gantt Chart' } },
                component: () => import('@/views/project/plan/gantt/index.vue'),
              },
              {
                path: 'milestone',
                name: 'milestone',
                meta: { title: { zh: '里程碑', en: 'Milestones' } },
                component: () => import('@/views/project/plan/milestone/index.vue'),
              },
              {
                path: 'stage-review',
                name: 'stage-review',
                meta: { title: { zh: '阶段验收', en: 'Stage Review' } },
                component: () => import('@/views/project/plan/stage-review/index.vue'),
              },
            ],
          },
          {
            path: 'task',
            name: 'task-management',
            meta: { title: { zh: '任务管理', en: 'Task Management' } },
            redirect: '/project/task/task-list',
            children: [
              {
                path: 'task-list',
                name: 'task-list',
                meta: { title: { zh: '任务列表', en: 'Task List' } },
                component: () => import('@/views/project/task/task-list/index.vue'),
              },
              {
                path: 'wbs',
                name: 'wbs',
                meta: { title: { zh: 'WBS任务分解', en: 'WBS Decomposition' } },
                component: () => import('@/views/project/task/wbs/index.vue'),
              },
              {
                path: 'my-tasks',
                name: 'my-tasks',
                meta: { title: { zh: '我的任务', en: 'My Tasks' } },
                component: () => import('@/views/project/task/my-tasks/index.vue'),
              },
            ],
          },
          {
            path: 'requirement',
            name: 'requirement-management',
            meta: { title: { zh: '需求管理', en: 'Requirement Management' } },
            redirect: '/project/requirement/requirement-pool',
            children: [
              {
                path: 'requirement-pool',
                name: 'requirement-pool',
                meta: { title: { zh: '需求池', en: 'Requirement Pool' } },
                component: () => import('@/views/project/requirement/requirement-pool/index.vue'),
              },
              {
                path: 'requirement-priority',
                name: 'requirement-priority',
                meta: { title: { zh: '需求优先级', en: 'Requirement Priority' } },
                component: () =>
                  import('@/views/project/requirement/requirement-priority/index.vue'),
              },
            ],
          },
          {
            path: 'bug',
            name: 'bug-management',
            meta: { title: { zh: '缺陷管理', en: 'Bug Management' } },
            redirect: '/project/bug/bug-list',
            children: [
              {
                path: 'bug-list',
                name: 'bug-list',
                meta: { title: { zh: '缺陷列表', en: 'Bug List' } },
                component: () => import('@/views/project/bug/bug-list/index.vue'),
              },
              {
                path: 'bug-stats',
                name: 'bug-stats',
                meta: { title: { zh: '缺陷统计', en: 'Bug Statistics' } },
                component: () => import('@/views/project/bug/bug-stats/index.vue'),
              },
            ],
          },
          {
            path: 'change',
            name: 'change-management',
            meta: { title: { zh: '变更管理', en: 'Change Management' } },
            redirect: '/project/change/change-request',
            children: [
              {
                path: 'change-request',
                name: 'change-request',
                meta: { title: { zh: '变更申请', en: 'Change Request' } },
                component: () => import('@/views/project/change/change-request/index.vue'),
              },
              {
                path: 'change-records',
                name: 'change-records',
                meta: { title: { zh: '变更记录', en: 'Change Records' } },
                component: () => import('@/views/project/change/change-records/index.vue'),
              },
            ],
          },
          {
            path: 'docs',
            name: 'docs-deliverables',
            meta: { title: { zh: '文档与交付', en: 'Docs & Deliverables' } },
            redirect: '/project/docs/doc-library',
            children: [
              {
                path: 'doc-library',
                name: 'doc-library',
                meta: { title: { zh: '文档库', en: 'Document Library' } },
                component: () => import('@/views/project/docs/doc-library/index.vue'),
              },
              {
                path: 'deliverables',
                name: 'deliverables',
                meta: { title: { zh: '交付物管理', en: 'Deliverables' } },
                component: () => import('@/views/project/docs/deliverables/index.vue'),
              },
            ],
          },
        ],
      },

      // // 研发资源
      // {
      //   path: '/resources',
      //   name: 'resources',
      //   meta: {
      //     icon: 'TeamOutlined',
      //     title: { zh: '研发资源', en: 'R&D Resources' },
      //   },
      //   redirect: '/resources/personnel',
      //   children: [
      //     {
      //       path: 'personnel',
      //       name: 'personnel',
      //       meta: { title: { zh: '人员管理', en: 'Personnel Management' } },
      //       redirect: '/resources/personnel/staff-profile',
      //       children: [
      //         {
      //           path: 'staff-profile',
      //           name: 'staff-profile',
      //           meta: { title: { zh: '人员档案', en: 'Staff Profiles' } },
      //           component: () => import('@/views/resources/personnel/staff-profile/index.vue'),
      //         },
      //         {
      //           path: 'staff-load',
      //           name: 'staff-load',
      //           meta: { title: { zh: '人员负载', en: 'Staff Load' } },
      //           component: () => import('@/views/resources/personnel/staff-load/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/resources/personnel/index.vue'),
      //     },
      //     {
      //       path: 'roles-permissions',
      //       name: 'roles-permissions',
      //       meta: { title: { zh: '角色权限', en: 'Roles & Permissions' } },
      //       redirect: '/resources/roles-permissions/role-list',
      //       children: [
      //         {
      //           path: 'role-list',
      //           name: 'role-list',
      //           meta: { title: { zh: '角色列表', en: 'Role List' } },
      //           component: () => import('@/views/resources/roles-permissions/role-list/index.vue'),
      //         },
      //         {
      //           path: 'permission-assign',
      //           name: 'permission-assign',
      //           meta: { title: { zh: '权限分配', en: 'Permission Assign' } },
      //           component: () =>
      //             import('@/views/resources/roles-permissions/permission-assign/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/resources/roles-permissions/index.vue'),
      //     },
      //     {
      //       path: 'assets',
      //       name: 'assets',
      //       meta: { title: { zh: '研发资产', en: 'R&D Assets' } },
      //       redirect: '/resources/assets/repo-bind',
      //       children: [
      //         {
      //           path: 'repo-bind',
      //           name: 'repo-bind',
      //           meta: { title: { zh: '代码仓库绑定', en: 'Repo Binding' } },
      //           component: () => import('@/views/resources/assets/repo-bind/index.vue'),
      //         },
      //         {
      //           path: 'dev-env',
      //           name: 'dev-env',
      //           meta: { title: { zh: '研发环境', en: 'Development Environments' } },
      //           component: () => import('@/views/resources/assets/dev-env/index.vue'),
      //         },
      //         {
      //           path: 'tool-integration',
      //           name: 'tool-integration',
      //           meta: { title: { zh: '工具集成', en: 'Tool Integration' } },
      //           component: () => import('@/views/resources/assets/tool-integration/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/resources/assets/index.vue'),
      //     },
      //   ],
      // },
      //
      // // 协作与沟通
      // {
      //   path: '/collaboration',
      //   name: 'collaboration',
      //   meta: {
      //     icon: 'MessageOutlined',
      //     title: { zh: '协作与沟通', en: 'Collaboration' },
      //   },
      //   redirect: '/collaboration/im',
      //   children: [
      //     {
      //       path: 'im',
      //       name: 'im',
      //       meta: { title: { zh: '即时通讯', en: 'Instant Messaging' } },
      //       redirect: '/collaboration/im/project-chat',
      //       children: [
      //         {
      //           path: 'project-chat',
      //           name: 'project-chat',
      //           meta: { title: { zh: '项目群聊', en: 'Project Chat' } },
      //           component: () => import('@/views/collaboration/im/project-chat/index.vue'),
      //         },
      //         {
      //           path: 'notifications',
      //           name: 'notifications',
      //           meta: { title: { zh: '消息通知', en: 'Notifications' } },
      //           component: () => import('@/views/collaboration/im/notifications/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/collaboration/im/index.vue'),
      //     },
      //     {
      //       path: 'meetings',
      //       name: 'meetings',
      //       meta: { title: { zh: '会议管理', en: 'Meetings' } },
      //       redirect: '/collaboration/meetings/meeting-schedule',
      //       children: [
      //         {
      //           path: 'meeting-schedule',
      //           name: 'meeting-schedule',
      //           meta: { title: { zh: '会议日程', en: 'Meeting Schedule' } },
      //           component: () =>
      //             import('@/views/collaboration/meetings/meeting-schedule/index.vue'),
      //         },
      //         {
      //           path: 'meeting-minutes',
      //           name: 'meeting-minutes',
      //           meta: { title: { zh: '会议纪要', en: 'Meeting Minutes' } },
      //           component: () => import('@/views/collaboration/meetings/meeting-minutes/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/collaboration/meetings/index.vue'),
      //     },
      //     {
      //       path: 'knowledge',
      //       name: 'knowledge',
      //       meta: { title: { zh: '知识库', en: 'Knowledge Base' } },
      //       redirect: '/collaboration/knowledge/wiki',
      //       children: [
      //         {
      //           path: 'wiki',
      //           name: 'wiki',
      //           meta: { title: { zh: 'Wiki文章', en: 'Wiki Articles' } },
      //           component: () => import('@/views/collaboration/knowledge/wiki/index.vue'),
      //         },
      //         {
      //           path: 'tech-experience',
      //           name: 'tech-experience',
      //           meta: { title: { zh: '技术沉淀', en: 'Tech Experience' } },
      //           component: () =>
      //             import('@/views/collaboration/knowledge/tech-experience/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/collaboration/knowledge/index.vue'),
      //     },
      //   ],
      // },
      //
      // // 数据分析
      // {
      //   path: '/analytics',
      //   name: 'analytics',
      //   meta: {
      //     icon: 'BarChartOutlined',
      //     title: { zh: '数据分析', en: 'Analytics' },
      //   },
      //   redirect: '/analytics/project-analysis',
      //   children: [
      //     {
      //       path: 'project-analysis',
      //       name: 'project-analysis',
      //       meta: { title: { zh: '项目分析', en: 'Project Analysis' } },
      //       redirect: '/analytics/project-analysis/progress-health',
      //       children: [
      //         {
      //           path: 'progress-health',
      //           name: 'progress-health',
      //           meta: { title: { zh: '进度健康度', en: 'Progress Health' } },
      //           component: () =>
      //             import('@/views/analytics/project-analysis/progress-health/index.vue'),
      //         },
      //         {
      //           path: 'workload-analysis',
      //           name: 'workload-analysis',
      //           meta: { title: { zh: '工时分析', en: 'Workload Analysis' } },
      //           component: () =>
      //             import('@/views/analytics/project-analysis/workload-analysis/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/analytics/project-analysis/index.vue'),
      //     },
      //     {
      //       path: 'quality',
      //       name: 'quality',
      //       meta: { title: { zh: '研发质量', en: 'R&D Quality' } },
      //       redirect: '/analytics/quality/bug-trend',
      //       children: [
      //         {
      //           path: 'bug-trend',
      //           name: 'bug-trend',
      //           meta: { title: { zh: '缺陷趋势', en: 'Bug Trend' } },
      //           component: () => import('@/views/analytics/quality/bug-trend/index.vue'),
      //         },
      //         {
      //           path: 'requirement-completion',
      //           name: 'requirement-completion',
      //           meta: { title: { zh: '需求交付率', en: 'Requirement Completion' } },
      //           component: () =>
      //             import('@/views/analytics/quality/requirement-completion/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/analytics/quality/index.vue'),
      //     },
      //     {
      //       path: 'dashboard',
      //       name: 'dashboard',
      //       meta: { title: { zh: '仪表盘', en: 'Dashboard' } },
      //       redirect: '/analytics/dashboard/custom-board',
      //       children: [
      //         {
      //           path: 'custom-board',
      //           name: 'custom-board',
      //           meta: { title: { zh: '自定义看板', en: 'Custom Board' } },
      //           component: () => import('@/views/analytics/dashboard/custom-board/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/analytics/dashboard/index.vue'),
      //     },
      //   ],
      // },
      //
      // // 系统管理
      // {
      //   path: '/system',
      //   name: 'system',
      //   meta: {
      //     icon: 'SettingOutlined',
      //     title: { zh: '系统管理', en: 'System Management' },
      //   },
      //   redirect: '/system/org-structure',
      //   children: [
      //     {
      //       path: 'org-structure',
      //       name: 'org-structure',
      //       meta: { title: { zh: '组织架构', en: 'Organization' } },
      //       redirect: '/system/org-structure/department',
      //       children: [
      //         {
      //           path: 'department',
      //           name: 'department',
      //           meta: { title: { zh: '部门管理', en: 'Department Management' } },
      //           component: () => import('@/views/system/org-structure/department/index.vue'),
      //         },
      //         {
      //           path: 'positions',
      //           name: 'positions',
      //           meta: { title: { zh: '岗位管理', en: 'Position Management' } },
      //           component: () => import('@/views/system/org-structure/positions/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/system/org-structure/index.vue'),
      //     },
      //     {
      //       path: 'permission-management',
      //       name: 'permission-management',
      //       meta: { title: { zh: '权限管理', en: 'Permission Management' } },
      //       redirect: '/system/permission-management/role-management',
      //       children: [
      //         {
      //           path: 'role-management',
      //           name: 'role-management',
      //           meta: { title: { zh: '角色管理', en: 'Role Management' } },
      //           component: () =>
      //             import('@/views/system/permission-management/role-management/index.vue'),
      //         },
      //         {
      //           path: 'data-permissions',
      //           name: 'data-permissions',
      //           meta: { title: { zh: '数据权限', en: 'Data Permissions' } },
      //           component: () =>
      //             import('@/views/system/permission-management/data-permissions/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/system/permission-management/index.vue'),
      //     },
      //     {
      //       path: 'system-settings',
      //       name: 'system-settings',
      //       meta: { title: { zh: '系统设置', en: 'System Settings' } },
      //       redirect: '/system/system-settings/notification-settings',
      //       children: [
      //         {
      //           path: 'notification-settings',
      //           name: 'notification-settings',
      //           meta: { title: { zh: '通知配置', en: 'Notification Settings' } },
      //           component: () =>
      //             import('@/views/system/system-settings/notification-settings/index.vue'),
      //         },
      //         {
      //           path: 'integration-settings',
      //           name: 'integration-settings',
      //           meta: { title: { zh: '集成配置', en: 'Integration Settings' } },
      //           component: () =>
      //             import('@/views/system/system-settings/integration-settings/index.vue'),
      //         },
      //       ],
      //       component: () => import('@/views/system/system-settings/index.vue'),
      //     },
      //     {
      //       path: 'audit-log',
      //       name: 'audit-log',
      //       meta: { title: { zh: '审计日志', en: 'Audit Log' } },
      //       component: () => import('@/views/system/audit-log/index.vue'),
      //     },
      //   ],
      // },
    ],
  },
]

export default BaseRoute
