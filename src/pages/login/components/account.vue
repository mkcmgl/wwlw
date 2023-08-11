<template>
    <el-form class="login-content-form">
        <el-form-item class="login-animation1">
            <el-input style="--el-input-border-radius: 24px; height: 35px;height: 35px;" v-model="state.ruleForm.userName" placeholder="请输入账号"
                clearable autocomplete="off">
                <template #prefix>
                    <img style="width:14px" src="/src/assets/images/username.svg">
                    <!-- <el-icon class="el-input__icon"></el-icon> -->
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="login-animation2">
            <el-input style="--el-input-border-radius: 24px;height: 35px;" :type="state.isShowPassword ? 'text' : 'password'"
                placeholder="请输入密码" v-model="state.ruleForm.password" autocomplete="off">
                <template #prefix>
                    <img style="width:14px" src="/src/assets/images/loginPossword.svg">
                </template>
                <template #suffix>
                    <i class="iconfont el-input__icon login-content-password"
                        :class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
                        @click="state.isShowPassword = !state.isShowPassword">
                    </i>
                </template>
            </el-input>
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
import { ElMessage } from 'element-plus';
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
}</style>