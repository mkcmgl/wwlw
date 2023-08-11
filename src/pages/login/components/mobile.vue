<template>
    <el-form class="login-content-form">
        <el-form-item class="login-animation1">
            <el-input style="--el-input-border-radius: 24px; height: 35px;height: 35px;" v-model="state.ruleForm.userName"
                placeholder="请输入手机号" clearable autocomplete="off">
                <template #prefix>
                    <img style="width:14px" src="/src/assets/images/loginPhone.svg">
                    <!-- <el-icon class="el-input__icon"></el-icon> -->
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="login-animation2">
            <el-col :span="15">
                <el-input style="--el-input-border-radius: 24px;height: 35px;" text maxlength="4" placeholder="请输入手机验证码"
                    v-model="state.ruleForm.code" autocomplete="off">
                    <template #prefix>
                        <img style="width:14px" src="/src/assets/images/loginCode.svg">
                    </template>
                </el-input>
            </el-col>
            <el-col :span="1"></el-col>
            			<el-col :span="8">
    				<el-button type="primary"  v-waves class="login-content-code">获取验证码</el-button>
    			</el-col>
        </el-form-item>
        <el-form-item class="login-animation4">
            <el-button type="primary" class="login-content-submit" round v-waves @click="onSignIn"
                :loading="state.loading.signIn">
                <span>登录</span>
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts" name="loginAccount">
import { reactive, computed } from 'vue';

const state = reactive({
    isShowPassword: false,
    ruleForm: {
        userName: '',
        password: '',
        code: '',
    },
    loading: {
        signIn: false,
    },
});

const onSignIn = async () => { console.log(`output-登录`) };
</script>

<style scoped lang="scss">
.login-content-form {
    margin-top: 20px;


    .login-content-password {
        display: inline-block;
        width: 20px;
        cursor: pointer;

        &:hover {
            color: #909399;
        }
    }



    .login-content-submit {
        width: 100%;
        letter-spacing: 2px;
        font-weight: 300;
        margin-top: 15px;
    }
}
</style>