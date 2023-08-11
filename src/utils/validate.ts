// 预设值

// phone                           手机号
// email                           邮箱
// password                        密码
// password-confirm:${password}    确认密码
// id-card                         身份证号
// social-credit-code              统一社会信用代码
// no-emoji                        不包含 emoji 表情

// 通用校验

// string 字符串
// min:${length} 最小长度
// max:${length} 最大长度
// length:${length} 长度
// regex:${regex} 正则表达式

// number 数字
// min:${number} 最小值
// max:${number} 最大值

// file 文件
// min:${size} 最小大小
// max:${size} 最大大小
// mime:${mime} MIME 类型

export type Value = string | number | boolean | null | undefined | File;

export type CustomErrorMessages = Record<string, string>;

export type ValueType = 'string' | 'number' | 'file';
export type PresetCondition = 'phone' | 'email' | 'password' | 'password-confirm' | 'id-card' | 'social-credit-code' | 'no-emoji';
export type CustomCondition = (value: Value) => string | undefined;

export type Rule = ValueType | PresetCondition | CustomCondition | 'required';

const innerValidate = (
    value: Value,
    rule: Rule,
    message: string | null,
    valueType: ValueType,
): {
    isValid: boolean;
    error?: string;
} => {

    // 先校验预设规则
    if (
        ['phone', 'email', 'password', 'id-card', 'social-credit-code', 'no-emoji'].includes(rule as PresetCondition)
        || (rule as string).startsWith('password-confirm')
    ) {
        value = (value ?? '').toString();

        if (
            rule === 'phone'
            && !/^1[3456789]\d{9}$/.test(value)
        ) {
            return {
                isValid: false,
                error: message ?? ':attr格式不正确',
            };
        }

        else if (
            rule === 'email'
            && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
        ) {
            return {
                isValid: false,
                error: message ?? ':attr格式不正确',
            };
        }

        else if (
            rule === 'password'
        ) {
            if (value.length < 6) {
                return {
                    isValid: false,
                    error: message ?? ':attr长度不能小于6位',
                };
            }
            else if (value.length > 20) {
                return {
                    isValid: false,
                    error: message ?? ':attr长度不能大于20位',
                };
            }
            else if (!/\d/.test(value)) {
                return {
                    isValid: false,
                    error: message ?? ':attr必须包含数字',
                };
            }
            else if (!/[A-Z]/.test(value)) {
                return {
                    isValid: false,
                    error: message ?? ':attr必须包含大写字母',
                };
            }
            else if (!/[a-z]/.test(value)) {
                return {
                    isValid: false,
                    error: message ?? ':attr必须包含小写字母',
                };
            }
            else if (
                !(new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]").test(value))
            ) {
                return {
                    isValid: false,
                    error: message ?? ':attr必须包含特殊字符',
                };
            }
            else if (/\s/.test(value)) {
                return {
                    isValid: false,
                    error: message ?? ':attr不能包含空格',
                };
            }
            else if (
                value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu)
            ) {
                return {
                    isValid: false,
                    error: message ?? ':attr不能包含表情符号',
                };
            }
        }

        else if (
            (rule as string).startsWith('password-confirm:')
        ) {
            const password = (rule as string).split(':')[1] ?? '';
            if (value !== password) {
                return {
                    isValid: false,
                    error: message ?? ':attr与密码不一致',
                };
            }
        }

        else if (
            rule === 'id-card'
            && !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value)
        ) {
            return {
                isValid: false,
                error: message ?? ':attr格式不正确',
            };
        }

        else if (
            rule === 'social-credit-code'
            && !/^[0-9A-Z]{18}$/.test(value)
        ) {
            return {
                isValid: false,
                error: message ?? ':attr格式不正确',
            };
        }

        else if (
            rule === 'no-emoji'
            && value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu)
        ) {
            return {
                isValid: false,
                error: message ?? ':attr不能包含表情符号',
            };
        }
    }

    // 通用校验
    if (
        valueType === 'string'
    ) {
        value = (value ?? '').toString();

        if (
            (rule as string).startsWith('min:')
            && value.length < parseInt((rule as string).split(':')[1] ?? '0')
        ) {
            return {
                isValid: false,
                error: message ?? ':attr长度不能小于:min位',
            };
        }

        else if (
            (rule as string).startsWith('max:')
            && value.length > parseInt((rule as string).split(':')[1] ?? '0')
        ) {
            return {
                isValid: false,
                error: message ?? ':attr长度不能大于:max位',
            };
        }

        else if (
            (rule as string).startsWith('length:')
            && value.length !== parseInt((rule as string).split(':')[1] ?? '0')
        ) {
            return {
                isValid: false,
                error: message ?? ':attr长度必须等于:length位',
            };
        }

        else if (
            (rule as string).startsWith('regex:')
            && !(new RegExp((rule as string).split(':')[1] ?? '')).test(value)
        ) {
            return {
                isValid: false,
                error: message ?? ':attr格式不正确',
            };
        }
    }

    else if (
        valueType === 'number'
    ) {
        value = parseFloat((value ?? '').toString());

        if (
            (rule as string).startsWith('min:')
            && value < parseFloat((rule as string).split(':')[1] ?? '0')
        ) {
            return {
                isValid: false,
                error: message ?? ':attr不能小于:min',
            };
        }

        else if (
            (rule as string).startsWith('max:')
            && value > parseFloat((rule as string).split(':')[1] ?? '0')
        ) {
            return {
                isValid: false,
                error: message ?? ':attr不能大于:max',
            };
        }
    }

    else if (
        valueType === 'file'
    ) {
        if (
            (rule as string).startsWith('max:')
            && (value as File).size > parseInt((rule as string).split(':')[1] ?? '0')
        ) {
            return {
                isValid: false,
                error: message ?? ':attr大小不能大于:max',
            };
        }

        else if (
            (rule as string).startsWith('min:')
            && (value as File).size < parseInt((rule as string).split(':')[1] ?? '0')
        ) {
            return {
                isValid: false,
                error: message ?? ':attr大小不能小于:min',
            };
        }

        else if (
            (rule as string).startsWith('mime:')
            && !(new RegExp((rule as string).split(':')[1] ?? '')).test((value as File).type)
        ) {
            return {
                isValid: false,
                error: message ?? ':attr格式不正确',
            };
        }
    }

    return {
        isValid: true,
    };
};

export const validate = (
    value: Value,
    rules: Rule[],
    messages = {} as CustomErrorMessages,
): {
    isValid: boolean;
    error?: string;
} => {

    let error: string | undefined;

    const valueType = (
        rules.find(rule => {
            return [
                'string', 'number', 'file',
            ].includes(rule as ValueType);
        }) ?? 'string'
    ) as ValueType;

    // 先校验是否是必填
    if (
        rules.includes('required')
        && (
            (
                valueType !== 'file'
                && (value ?? '').toString().trim() === ''
            )
            || (
                valueType === 'file'
                && (
                    value === null
                    || value === undefined
                    || (value as File).size === 0
                    || value === ''
                )
            )
        )
    ) {
        return {
            isValid: false,
            error: messages.required ?? ':attr不能为空',
        };
    }

    // 不要默认添加 required 规则和其他规则，显式地添加所有校验规则，避免重复校验
    const rulesWithoutRequired = rules.filter(rule => rule !== 'required');

    for (let i = 0; i < rulesWithoutRequired.length; i++) {

        const rule = rulesWithoutRequired[i];

        if (typeof rule === 'function') {
            error = rule(value);
        }
        else {

            const message = Object.keys(messages).includes(rule.split(':')[0])
                ? messages[rule.split(':')[0]]
                : null;

            const result = innerValidate(value, rule, message, valueType);

            if (!result.isValid) {
                error = result.error;
            }  
        }

        if (error) {
            break;
        }
    }

    return {
        isValid: !error,
        error,
    };
};