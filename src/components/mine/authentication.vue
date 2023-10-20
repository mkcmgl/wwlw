<template>
  <div class="h-[55px] w-50 flex items-center px-4" @click="back">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="cursor-pointer"
      width="6.28"
      height="10.499"
      viewBox="0 0 6.28 10.499"
    >
      <path
        class="a"
        d="M133.053,555.55l3.606-3.559a1.021,1.021,0,0,0,.009-1.418,1,1,0,0,0-.713-.3,1.07,1.07,0,0,0-.705.289l-4.29,4.233a1.019,1.019,0,0,0,0,1.423l4.26,4.26a1,1,0,0,0,1.418,0,1.019,1.019,0,0,0,0-1.417Z"
        transform="translate(-130.669 -550.275)"
      />
    </svg>
    <h1
      class="font-bold text-xl ml-3 leading-relaxed cursor-pointer"
      v-html="title"
    />
    <slot />
  </div>
  <div class="h-[calc(100vh-150px)] mx-4 overflow-auto">
    <div class="flex items-center justify-center mb-8">
      <img src="/src/assets/images/authentication-1.svg" class="" alt="1" />
      <div class="text-[#333] text-base ml-3">激活数字身份</div>
      <i
        class="border-spacing-3 w-[200px] border-[#BBD2F1] border-solid border-[1px] mx-[50px]"
      ></i>
      <img src="/src/assets/images/authentication-2.svg" alt="2" />
      <div class="text-[#333] text-base ml-3">实名认证申请</div>
    </div>
    <div
      class="m-auto h-[calc(100vh-450px)] max-h-[calc((100vw-750px)/3)] relative min-h-[660px] w-[calc(100vw-750px)] min-w-[900px] bg-[#fff] rounded-[10px] shadow-lg"
    >
      <div class="w-[65%] max-w-[1000px] m-auto h-full pt-12 flex flex-col">
        <div class="absolute top-5 left-5">
          <i
            class="align-middle inline-block border-[#2F88FF] border-solid border-[3px] h-4 rounded-[10px] c"
          ></i>
          <span class="text-[#333] text-base ml-4">基本信息</span>
        </div>
        <el-form-item
          label-width="120px"
          style="font-size: 14px"
          label="实名认证类型"
        >
          <el-radio-group v-model="typeAuthor" @change="handlerTypeChange">
            <el-radio label="1">企业</el-radio>
            <el-radio label="2">个人</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="typeAuthor == '1'">
          <el-form
            ref="businessFormRef"
            :model="(iidFrom.businessForm as BusinessForm)"
            :rules="businessRules"
            label-width="120px"
            class="demo-ruleForm text-sm flex-1 max-w-[750px] m-auto"
            :size="formSize"
          >
            <el-form-item label="机构名称" prop="orgName">
              <el-input
                v-model="(iidFrom.businessForm as BusinessForm).orgName"
                placeholder="请输入机构名称"
              />
            </el-form-item>
            <el-form-item label="营业执照" prop="licenseImg">
                <el-upload
                  class="uploadImg"
                  drag
                  multiple
                  v-model:file-list="fileList"
                  list-type="picture-card"
                  :action="_UPLOAD_URL_"
                  
                  :on-remove="handleRemove"
                  :on-preview="handlePictureCardPreview"
                  :headers="{ Authorization: 'Bearer ' + authStore.token }"
                  :limit="limitNum"
                  :class="{disabled:uploadDisabled1}" 
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleAvatarSuccess"
                >
                <!-- :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"

                 -->
                   <div >
                        <img class="w-[38px] h-[28px] mx-auto block" src="/src/assets/images/update-img.svg" />
                        <div class="el-upload__text">上传图片</div>
                  </div>      
                </el-upload>

              <div class="el-upload__tip flex-1">
                <span class="block"
                  >1. 支持的图片格式包括 JPG、JPEG 和 PNG</span
                >
                <span class="block">2. 图片不得超过5M </span>
                <span class="block">3. 上传的图片需清晰完整</span>
              </div>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <div class="flex-nowrap flex">
                <el-select
                  v-model="selectValue.id"
                  class="mr-2"
                  placeholder="请选择"
                  @change="handler1"
                  clearable
                >
                  <el-option
                    v-for="item in addressData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="selectValue2.id"
                  class="mr-2"
                  placeholder="请选择"
                  @change="handler2"
                  clearable
                >
                  <el-option
                    v-for="item in addressData2"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="selectValue3.id"
                  placeholder="请选择"
                  @change="handler3"
                  clearable
                >
                  <el-option
                    v-for="item in addressData3"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="详细地址" prop="addressDetail">
              <el-input
                v-model="(iidFrom.businessForm as BusinessForm).addressDetail"
                placeholder="请输入详细地址"
              />
            </el-form-item>
            <div class="absolute left-5">
              <i
                class="align-middle inline-block border-[#2F88FF] border-solid border-[3px] h-4 rounded-[10px] c"
              ></i>
              <span class="text-[#333] text-base ml-4">联系人信息</span>
            </div>
            <el-form-item
              label="联系人姓名"
              prop="contactName"
              class="mt-[60px]"
            >
              <el-input
                v-model="(iidFrom.businessForm as BusinessForm).contactName"
                placeholder="请输入联系人姓名"
              />
            </el-form-item>
            <el-form-item label="联系人手机号" prop="contactPhone">
              <el-input
                v-model="((iidFrom.businessForm as BusinessForm) as BusinessForm).contactPhone"
                placeholder="请输入联系人手机号"
              />
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
          <el-form
            ref="poesonalRuleFormRef"
            :model="(iidFrom.poesonalForm as PeosonalForm)"
            :rules="poesonalRules"
            label-width="120px"
            class="demo-ruleForm text-sm flex-1 max-w-[750px] m-auto"
            :size="formSize"
            status-icon
          >
            <el-form-item label="真实姓名" prop="realName">
              <el-input
                v-model="(iidFrom.poesonalForm as PeosonalForm).realName"
                placeholder="请输入真实姓名"
              />
            </el-form-item>
            <el-form-item label="身份证号" prop="idNumber">
              <el-input
                v-model="(iidFrom.poesonalForm as PeosonalForm).idNumber"
                placeholder="请输入身份证号"
              />
            </el-form-item>
            <el-form-item
              label="身份证人像面"
              prop="idPortrait"
              ref="idPortrait"
            >
              <el-upload
                class="uploadImg"
                drag
                multiple
                 v-model:file-list="idPortraitFileList"
                  :action="_UPLOAD_URL_"
                  :headers="{ Authorization: 'Bearer ' + authStore.token }"
                  :on-remove="handleRemoveIdPortrait"
                  :on-preview="handlePictureCardPreview"
                  :limit="limitNum"
                  :class="{disabled:uploadDisabled1}" 
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleAvatarSuccessIdPortrait"
                  list-type="picture-card"

              >
                  <div class="flex justify-around">
                    <!-- <div>
                      <img
                        class="w-[38px] h-[28px] mx-auto block"
                        src="/src/assets/images/update-img.svg"
                      />
                      <div class="el-upload__text">上传图片</div>
                    </div> -->
                    <img class="" src="/src/assets/images/id-front.svg" />
                  </div>
              </el-upload>

              <div class="el-upload__tip flex-1">
                <span class="block"
                  >1. 支持的图片格式包括 JPG、JPEG 和 PNG</span
                >
                <span class="block">2. 图片不得超过5M </span>
                <span class="block">3. 上传的图片需清晰完整</span>
              </div>
            </el-form-item>
            <el-form-item label="身份证国徽面" prop="idEmblem" ref="idEmblem">
              <el-upload
                class="uploadImg"
                drag
                multiple
                v-model:file-list="idEmblemFileList"
                :on-remove="handleRemoveIdEmblem"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccessIdEmblem"
                :action="_UPLOAD_URL_"
                :limit="limitNum"
                :class="{disabled:uploadDisabled1}" 
                :headers="{ Authorization: 'Bearer ' + authStore.token }"
                list-type="picture-card"
              >
                  <div  class="flex justify-around">
                    <!-- <div>
                      <img
                        class="w-[38px] h-[28px] mx-auto block"
                        src="/src/assets/images/update-img.svg"
                      />
                      <div class="el-upload__text">上传图片</div>
                    </div> -->
                    <img class=" " src="/src/assets/images/id-back.svg" />
                  </div>
              </el-upload>
              <div class="el-upload__tip flex-1">
                <span class="block"
                  >1. 支持的图片格式包括 JPG、JPEG 和 PNG</span
                >
                <span class="block">2. 图片不得超过5M </span>
                <span class="block">3. 上传的图片需清晰完整</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <button
      @click="submitForm()"
      class="m-auto mt-4 block w-72 p-2.5 rounded-[5px] text-white tracking-widest clickable relative"
      :class="[
        loading
          ? 'bg-slate-300 cursor-not-allowed'
          : 'bg-[linear-gradient(90deg,#0477FD_0%,#04D8FD_100%)]',
      ]"
      type="submit"
      :disabled="loading"
      v-wave="!loading"
    >
      <i v-if="loading" class="mdi mdi-loading mdi-spin mr-2"></i>
      提交
    </button>
  </div>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { useMeta } from "vue-meta";
import { type ComputedRef, computed, ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { useAuthStore } from "~/store/auth";
import {
    PeosonalForm,
    BusinessForm,
    AddressObj,
    AddressList,
} from "~/types/iid";
import type  { UploadProps , UploadUserFile } from "element-plus";
import axios from "~/plugins/axios";
import { notify } from "@kyvg/vue3-notification";
import { ExtendImportMeta } from "~/types.d";
import encrypt from "~/utils/encrypt";
import type { UploadFile } from "element-plus";
const _UPLOAD_URL_ =
  (import.meta as ExtendImportMeta).env.VITE_API_UPLOAD_URL +
  "/admin-api/system/iid/uploadImg";
// const _UPLOAD_URL_ = 'http://10.180.13.35:48082/infra/file/upload';
const loading = ref(false);
const props = withDefaults(
    defineProps<{
    title: string;
    useTitleTemplate?: boolean;
  }>(),
    {
        title: "",
        useTitleTemplate: true,
    }
);
const authStore = useAuthStore();

const iidFrom = computed(() => authStore.iidFrom);
let selectValue = reactive<AddressObj>({
    id: "",
    name: "",
});
let selectValue2 = reactive<AddressObj>({
    id: "",
    name: "",
});
let selectValue3 = reactive<AddressObj>({
    id: "",
    name: "",
});
const limitNum = ref(1);
const addressData = ref<AddressList>([]);
const addressData2 = ref<AddressList>([]);
const addressData3 = ref<AddressList>([]);
const uploadDisabled1 = ref(false);
const fileList = ref<UploadUserFile[]>();
const idPortraitFileList = ref<UploadUserFile[]>();
const idEmblemFileList = ref<UploadUserFile[]>();
type Meta = {
  title: string;
  titleTemplate?: boolean;
};

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const typeAuthor = ref("1");
const computedMeta: ComputedRef<Meta> = computed(() => {
    let meta = {
        title: props.title.html2text(),
    } as Meta;

    if (!props.useTitleTemplate) {
        meta.titleTemplate = false;
    }

    return meta as Meta;
});

useMeta(computedMeta.value);

const formSize = ref("default");
const businessFormRef = ref<FormInstance>();
const poesonalRuleFormRef = ref<FormInstance>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const equalToEmpty = (rule: any, value: any, callback: any) => {
    if (/^\s+$/gi.test(value)) {
        callback(new Error("不能全输入空格"));
    } else {
        callback();
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePhone = (rule: any, value: any, callback: any) => {
    //使用正则表达式进行验证手机号码
    if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号格式！"));
    } else {
        callback();
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const equalToid = (rule: any, value: any, callback: any) => {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback(new Error("请输入正确的身份证号"));
    } else {
        callback();
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateEmoji = (rule: any, value: any, callback: any) => {
    if (value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu)) {
        callback(new Error("不能包含表情符号"));
    } else {
        callback();
    }
};
const businessRules = reactive<FormRules<BusinessForm>>({
    orgName: [
        { required: true, message: "请输入机构名称", trigger: "blur" },
        {
            min: 2,
            max: 100,
            message: "机构名称长度必须介于 2 和 100 之间",
            trigger: "blur",
        },
        { required: true, validator: equalToEmpty, trigger: "blur" },
        { required: true, validator: validateEmoji, trigger: "blur" },
    ],
    addressDetail: [
        { required: true, message: "请输入详细地址", trigger: "blur" },
        {
            min: 2,
            max: 200,
            message: "详细地址必须介于 2 和 200 之间",
            trigger: "blur",
        },
        { required: true, validator: equalToEmpty, trigger: "blur" },
        { required: true, validator: validateEmoji, trigger: "blur" },
    ],
    licenseImg: [{ required: true, message: "请上传营业执照", trigger: "blur" }],
    contactName: [
        { required: true, trigger: "blur", message: "请输入联系人姓名" },
        {
            min: 1,
            max: 100,
            message: "联系人姓名必须介于 1 和 100 之间",
            trigger: "blur",
        },
        { required: true, validator: equalToEmpty, trigger: "blur" },
        { required: true, validator: validateEmoji, trigger: "blur" },
    ],
    contactPhone: [
        { required: true, trigger: "blur", message: "请输入联系人电话" },
        { required: true, validator: validatePhone, trigger: "blur" },
    ],
    address: [{ required: true, message: "请选择完整地址" }],
});
const poesonalRules = reactive<FormRules<PeosonalForm>>({
    realName: [
        { required: true, trigger: "blur", message: "请输入姓名" },
        { min: 1, max: 20, message: "姓名长度 1 和 20 之间", trigger: "blur" },
        { required: true, validator: equalToEmpty, trigger: "blur" },
        { required: true, validator: validateEmoji, trigger: "blur" },
    ],
    idNumber: [
        { required: true, trigger: "blur", message: "请输入身份证" },
        { required: true, validator: equalToid, trigger: "blur" },
    ],
    idPortrait: [{ required: true, message: "请输入身份证头像面" }],
    idEmblem: [{ required: true, message: "请输入身份证国徽面" }],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlerTypeChange = (e: any) => {
    if (e == 2) {
        authStore.clearPoesonalForm();
        (poesonalRuleFormRef.value as FormInstance).resetFields();
        idPortraitFileList.value=<UploadUserFile>[];
        idEmblemFileList.value=<UploadUserFile>[];
    } else {
        authStore.clearBusinessForm();
        (businessFormRef.value as FormInstance).resetFields();
        fileList.value=<UploadUserFile>[];
    }
};

onMounted(() => {
    getProvince();
    delectForm();
});
const getProvince = async () => {
    const { data } = await axios.get("/area/tree");
    if (data.code == 0) {
        addressData.value = data.data;
    }
};
const delectForm = () => {
    authStore.clearBusinessForm();
    authStore.clearPoesonalForm();
};
const handler1 = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (iidFrom.value.businessForm as BusinessForm).address = "";
    selectValue2 = reactive<AddressObj>({
        id: "",
        name: "",
    });
    selectValue3 = reactive<AddressObj>({
        id: "",
        name: "",
    });
    if (selectValue.id != "") {
        for (let i = 0; i < addressData.value.length; i++) {
            if (addressData.value[i].id == selectValue.id) {
                addressData2.value = addressData.value[i].children;
                selectValue.name = addressData.value[i].name;
            }
        }
    }
};

const handler2 = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (iidFrom.value.businessForm as BusinessForm).address = "";
    selectValue3 = reactive<AddressObj>({
        id: "",
        name: "",
    });
    if (selectValue2.id != "") {
        for (let i = 0; i < addressData2.value.length; i++) {
            if (addressData2.value[i].id == selectValue2.id) {
                addressData3.value = addressData2.value[i].children;
                selectValue2.name = addressData2.value[i].name;
            }
        }
    }
};
const handler3 = () => {
    if (selectValue3.id == "") {
        (iidFrom.value.businessForm as BusinessForm).address = "";
        selectValue3.name = "";
    } else {
        for (let i = 0; i < addressData3.value.length; i++) {
            if (addressData3.value[i].id == selectValue3.id) {
                selectValue3.name = addressData3.value[i].name;
            }
        }
        (
      iidFrom.value.businessForm as BusinessForm
        ).address = `${selectValue.name}${selectValue2.name}${selectValue3.name}`;
    }
};

const router = useRouter();

const back = () => {
    router.back();
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
    if (
        rawFile.type == "image/png" ||
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/JPEG"
    ) {
        if (rawFile.size / 1024 / 1024 < 5) {
            return true;
        } else {
            notify({
                type: "error",
                text: "图片不得超过5M",
            });
            return false;
        }
    } else {
        notify({
            type: "error",
            text: "上传文件格式务必PNG|JPG|JPEG",
        });
        return false;
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const handleAvatarSuccess= (response:any,uploadFile:any) => {
    (iidFrom.value.businessForm as BusinessForm).licenseImg = response.data;
    uploadDisabled1.value = true;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const handleAvatarSuccessIdPortrait= (response:any,uploadFile:any) => {
    (iidFrom.value.poesonalForm as PeosonalForm).idPortrait = response.data;
    uploadDisabled1.value = true;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const handleAvatarSuccessIdEmblem= (response:any,uploadFile:any) => {
    (iidFrom.value.poesonalForm as PeosonalForm).idEmblem = response.data;
    uploadDisabled1.value = true;
};
const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!;
    dialogVisible.value = true;
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const handleRemove = (file: any,fileList:any) => {
    uploadDisabled1.value =false;
    (iidFrom.value.businessForm as BusinessForm).licenseImg = '';
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const handleRemoveIdPortrait = (file: any,fileList:any) => {
    uploadDisabled1.value =false;
    (iidFrom.value.poesonalForm as PeosonalForm).idPortrait = '';
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const handleRemoveIdEmblem = (file: any,fileList:any) => {
    uploadDisabled1.value =false;
    (iidFrom.value.poesonalForm as PeosonalForm).idEmblem = '';
};
const submitForm = async () => {
    if (typeAuthor.value == "1") {
        (businessFormRef.value as FormInstance).validate((valid) => {
            if (valid) {
                const submitBusinessForm = {
                    iid: iidFrom.value.iidDidForm.iid,
                    publicKey: iidFrom.value.iidDidForm.publicKey,
                    authenticationType: "102",
                    orgName: encrypt(
            (iidFrom.value.businessForm as BusinessForm).orgName as string
                    ),
                    businessLicense: (iidFrom.value.businessForm as BusinessForm)
                        .licenseImg,
                    address: encrypt(
            (iidFrom.value.businessForm as BusinessForm).address as string
                    ),
                    addressDetail: encrypt(
            (iidFrom.value.businessForm as BusinessForm).addressDetail as string
                    ),
                    contactName: encrypt(
            (iidFrom.value.businessForm as BusinessForm).contactName as string
                    ),
                    contactMobile: encrypt(
            (iidFrom.value.businessForm as BusinessForm).contactPhone as string
                    ),
                };
                loading.value = true;
                axios
                    .post("/iid/activate", submitBusinessForm)
                    .then(({ data }) => {
                        if (data.code == 0) {
                            notify({
                                type: "success",
                                text: "提交成功,请等待审核！",
                            });
                            authStore.clearIidFrom();
                            router.push({
                                path: "/",
                            });
                        } else {
                            notify({ type: "error", text: data.msg });
                        }
                    })
                    .catch((e) => {
                        notify({ type: "error", text: e });
                    })
                    .finally(() => {
                        loading.value = false;
                        (businessFormRef.value as FormInstance).clearValidate();
                    });
            } else {
                console.log(`output->error`);
                return false;
            }
        });
    } else {
        (poesonalRuleFormRef.value as FormInstance).validate((valid) => {
            if (valid) {
                const submitPeosonalForm = {
                    iid: iidFrom.value.iidDidForm.iid,
                    publicKey: iidFrom.value.iidDidForm.publicKey,
                    authenticationType: "101",
                    realName: encrypt(
            (iidFrom.value.poesonalForm as PeosonalForm).realName as string
                    ),
                    idNumber: encrypt(
            (iidFrom.value.poesonalForm as PeosonalForm).idNumber as string
                    ),
                    idPortrait: (iidFrom.value.poesonalForm as PeosonalForm).idPortrait,
                    idEmblem: (iidFrom.value.poesonalForm as PeosonalForm).idEmblem,
                };
                loading.value = true;
                axios
                    .post("/iid/activate", submitPeosonalForm)
                    .then(({ data }) => {
                        if (data.code == 0) {
                            notify({
                                type: "success",
                                text: "提交成功,请等待审核！",
                            });
                            authStore.clearIidFrom();
                            router.push({
                                path: "/",
                            });
                        } else {
                            notify({ type: "error", text: data.msg });
                        }
                    })
                    .catch((e) => {
                        notify({ type: "error", text: e });
                    })
                    .finally(() => {
                        loading.value = false;
                        (poesonalRuleFormRef.value as FormInstance).clearValidate();
                    });
            } else {
                console.log(`output->error`);
                return false;
            }
        });
    }
};
</script>

<style lang="scss" scoped>
.uploadImg{
  margin-right:1rem;
  ::v-deep(.el-upload-dragger){
    height: 100%;
  }
} 
</style>

