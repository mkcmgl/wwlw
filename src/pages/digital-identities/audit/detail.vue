<template>
  <page-title title="详情" />
  <div class="h-[calc(100vh-140px)] bg-[#fff] mx-4 overflow-y-scroll">
    <button
      v-if="
        company.authenticationStatus == 0 || company.authenticationStatus == 3
      "
      type="submit"
      class="float-right flex items-center justify-center py-2 w-[50px] mx-2 rounded text-white fill-white tracking-widest clickable relative overflow-hidden linear-hover"
      v-wave
      @click="showDetailDialog = true"
    >
      审核
    </button>
    <div class="w-full h-full p-4">
      <span class="font-bold">数字身份信息</span>
      <div class="flex justify-between my-4 font-light">
        <div class="flex-1 flex">
          <span class="mr-4">数字身份DID</span>
          <span
            :title="company.iid"
            class="truncate w-[calc(29vw)] block overflow-hidden"
            >{{ company.iid }}</span
          >
        </div>
        <div class="flex-1 flex">
          <span class="mr-4">数字身份公钥</span>
          <span
            :title="company.publicKey"
            class="truncate w-[calc(29vw)] block overflow-hidden"
          >
            {{ company.publicKey }}
          </span>
        </div>
      </div>
      <span class="font-bold">实名认证信息</span>
      <div class="flex justify-between my-4 font-light">
        <div class="flex-1">
          <span class="mr-4">认证类型</span>
          <span>{{
            company.authenticationType == "101" ? "个人认证" : "企业认证"
          }}</span>
        </div>
        <div class="flex-1">
          <span class="mr-4">认证状态</span>
          <span>{{
            company.authenticationStatus == "0"
              ? "未认证"
              : company.authenticationStatus == "1"
              ? "已认证"
              : company.authenticationStatus == "2"
              ? "认证未通过"
              : "认证中"
          }}</span>
        </div>
      </div>
      <div v-if="company.authenticationType == '102'">
        <div class="flex justify-between my-4 font-light">
          <div class="flex-1">
            <span class="mr-4">机构名称</span>
            <span>{{ decrypt(company.orgName) }}</span>
          </div>
          <div class="flex-1">
            <span class="mr-4">地址</span>
            <span>{{ decrypt(company.address) }}</span>
          </div>
        </div>
        <div class="flex justify-between my-4 font-light">
          <div class="flex-1">
            <span class="mr-4">详细地址</span>
            <span>{{ decrypt(company.addressDetail) }}</span>
          </div>
          <div class="flex-1">
            <span class="mr-4">联系人姓名</span>
            <span>{{ decrypt(company.contactName) }}</span>
          </div>
        </div>
        <div class="flex justify-between my-4 font-light">
          <div class="flex-1">
            <span class="mr-4">联系人手机号</span>
            <span>{{ decrypt(company.contactMobile) }}</span>
          </div>
          <div class="flex-1">
            <span class="mr-4 align-top">营业执照</span>
            <img
              class="w-60 inline-block"
              :disabled="loading"
              @click="showDialogVisible('businessLicense')"
              :src="company.businessLicense"
              alt="营业执照"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex justify-between my-4 font-light">
          <div class="flex-1">
            <span class="mr-4">真实姓名</span>
            <span>{{ decrypt(company.realName) }}</span>
          </div>
          <div class="flex-1">
            <span class="mr-4">身份证号</span>
            <span>{{ decrypt(company.idNumber) }}</span>
          </div>
        </div>
        <div class="flex justify-between my-4 font-light">
          <div class="flex-1">
            <span class="mr-4 align-top">身份证人像面</span>
            <img
              class="w-60 inline-block"
              :disabled="loading"
              @click="showDialogVisible('idPortrait')"
              :src="company.idPortrait"
              alt="身份证人像面"
            />
          </div>
          <div class="flex-1">
            <span class="mr-4 align-top">身份证国徽面</span>
            <img
              class="w-60 h-60 inline-block"
              :disabled="loading"
              @click="showDialogVisible('idEmblem')"
              :src="company.idEmblem"
              alt="身份证国徽面"
            />
          </div>
        </div>
      </div>
    </div>

    <detail-dialog :companyId="companyId" v-model:show="showDetailDialog" />
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="营业执照" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import axios from "~/plugins/axios";
import PageTitle from "~/components/page-title.vue";
import DetailDialog from "./detail-dialog.vue";
import { useRoute } from "vue-router";
import { type Ref, ref, onBeforeMount } from "vue";
import { decrypt } from "~/utils/encrypt";

type Company = {
  username: string;
  initialPassword: string;
  iid: string;
  mobile: string;
  status: 0 | 1;
  roleName: string;
  authorize: string;
  remark: string;
  businessLicense: string;

  publicKey: string;
  authenticationType: string;
  authenticationStatus: string;
  orgName: string;
  address: string;
  addressDetail: string;
  contactName: string;
  contactMobile: string;
  idEmblem: string;
  id: string;
  realName: string;
  idNumber: string;
  idPortrait: string;
};

const dialogVisible = ref(false);
const dialogImageUrl = ref("");
const company = ref({}) as Ref<Company>;
const showDetailDialog = ref(false);
const route = useRoute();
const companyId = route.query.companyId as string;
const loading = ref(false);
onBeforeMount(async () => {
    loading.value = true;
    const { data } = await axios.get(`/iid/getAuthDetail`, {
        params: { authenticationId: String(companyId) },
    });
    if (data.code == 0) {
        company.value = data.data;
        loading.value = false;
    }
});
const showDialogVisible = (type: string) => {
    dialogVisible.value = true;
    if (type == "businessLicense") {
        dialogImageUrl.value = company.value.businessLicense;
    } else if (type == "idPortrait") {
        dialogImageUrl.value = company.value.idPortrait;
    } else if (type == "idEmblem") {
        dialogImageUrl.value = company.value.idEmblem;
    }
};
</script>
