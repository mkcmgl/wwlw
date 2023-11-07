<template>
  <page-title title="实名认证审核" />
  <paginate-page
    enable-sticky
    api="iid/reviewList"
    api-method="POST"
    :thead="[
      '账号',
      '数字身份标识',
      '机构名称/真实姓名',
      '认证类型',
      '实名认证状态',
      '审核时间',
      '操作',
    ]"
    :filters="{
      username: {
        type: 'input-max-rule',
        placeholder: '账号',
        label: '账号'
      },
      authenticationType: {
        type: 'single-select',
        label: '认证类型',
        options: [
          {
            value: '101',
            label: '个人认证',
          },
          {
            value: '102',
            label: '企业认证',
          },
        ],
      },
      orgName: {
        type: 'input-max-rule',
        placeholder: '机构名称',
        label: '机构名称',
      },
      review: {
        type: 'datetime-period',
        label: '审核时间',
        start: 'reviewStartTime',
        end: 'reviewEndTime',
      },
      authenticationStatus: {
        type: 'single-select',
        label: '认证状态',
        options: [

          {
            value: '1',
            label: '已认证',
          },
          {
            value: '2',
            label: '认证未通过',
          },
          {
            value: '3',
            label: '认证中',
          },
        ],
      },
      realName: {
        type: 'input-max-rule',
        placeholder: '真实姓名',
        label: '真实姓名',
      }
    }"
  >
    <template #tr="{ singleData }">
      <tr>
        <td>
          {{ decrypt((singleData as Member).username) }}
        </td>
        <td>
          {{ (singleData as Member).iid }}
        </td>
        <td>
          {{ (singleData as Member).orgName ? decryptByDES((singleData as Member).orgName) : decrypt((singleData as Member).realName) }}
        </td>
        <td>
          {{ MemberAuthenticationType[(singleData as Member).authenticationType as 101 | 102] }}
        </td>
        <td>
          {{ MemberAuthenticationStatus[(singleData as Member).authenticationStatus as 0 | 1 | 2 | 3] }}
        </td>
        <td>
          {{ parseTime((singleData as Member).reviewTime) }}
        </td>
        <td class="listRightSticky bg-white">
          <router-link
            class="text-blue-600 no-underline hover:underline"
            :to="{
              name: 'digital-identities/audit/detail',
              query: {
                companyId: (singleData as Member).authenticationId,
              },
            }"
          >
            详情
          </router-link>
        </td>
      </tr>
    </template>
  </paginate-page>
</template>

<script lang="ts" setup>
import PageTitle from "~/components/page-title.vue";
import PaginatePage from "~/components/paginate-page/index.vue";
import {parseTime } from "~/utils/tool";
import { decrypt, decryptByDES, } from "~/utils/encrypt";

enum MemberAuthenticationStatus {
  "未认证" = 0,
  "已认证" = 1,
  "认证未通过" = 2,
  "认证中" = 3,
}
enum MemberAuthenticationType {
  "个人认证" = 101,
  "企业认证" = 102,
}

type Member = {
  id: string;
  userId: string;
  iid: string;
  username: string;
  authenticationId: string;
  orgName: string;
  authenticationType: 101 | 102;
  authenticationStatus: 0 | 1 | 2 | 3;
  applyTime: string;
  reviewTime: string;
  realName: string;

  status: 0 | 1;
  roleName: string;
  createTime: string;
};
</script>
