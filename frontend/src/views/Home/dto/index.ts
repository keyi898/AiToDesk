
export type ChatItemInfo = {
    agent_info?: AgentItemDto,
    contextPath: string
    context_id: string
    model: string
    parameters: string,
    title: string,
    search_type?: string,
    supplierName?: string
}

// 模型安装进度实体
export type InstallProgress = {
    status?: number
    digest?: string
    total?: number
    completed?: number
    progress?: number
    speed?: number
}

// 带有文本、图片、文件的提问实体
export type MultipeQuestionDto = {
    content: string,
    files?: string[],
    images?: string[]
}

// 回答信息stat内容实体
export type Stat = {
    model?: string,
    created_at?: string,
    total_duration?: string,
    load_duration?: string,
    prompt_eval_count?: string,
    prompt_eval_duration?: string,
    eval_count?: string,
    eval_duration?: string,
}

// 回答信息实体
export type AnswerInfo = {
    content: string | string[],
    id?: string
    stat?: Stat | Stat[],
    search_result?: Array<{ content: string; link: string; title: string }>,
    tools_result?: Array<string>

}
// 对话信息实体
export type ChatInfo = Map<MultipeQuestionDto, AnswerInfo>
// 第三方api服务商实体
export type ThirdPartyApiServiceItem = {
    apiKey: string
    baseUrl: string
    baseUrlExample: string
    help: string
    home: string
    isUseUrlExample: boolean
    supplierName: string
    supplierTitle: string
    status: boolean,
    icon: string,
    sort: string
}

// api服务商下的模型列表
export type SupplierModelItem = {
    capability: Array<string>
    modelName: string
    supplierName: string,
    status: boolean,
    title: string
}
// 添加第三方下属模型
export type AddThirdPartySupplierMode = {
    modelName: string;
    capability: string[];
    title: string;
    supplierName?: string;
    status?: boolean;
};

// 添加模型服务商表单数据
export type AddSupplierFormData = {
    supplierTitle: string,
    supplierName: string,
    baseUrl: string,
    apiKey: string,
}

// 服务商配置信息
export type SupplierConfigInfo = {
    baseUrl: string,
    apiKey: string,
}

// 当前模型的可选实体
export type CurrentModelDto = {
    model?: string,
    parameters?: string,
    supplierName?: string,
}

// 智能体对象实体
export type AgentItemDto = {
    agent_name: string,
    agent_title: string,
    prompt: string,
    msg: string,
    agent_type: string,
    icon: string,
    create_time: number,
    is_system: boolean,
}

// MCP服务器列表实体
export type CloudMcpServerListDto = {
    name: string;
    description: string;
    type: string;
    command: string;
    baseUrl: string;
    env: string;
    args: string;
    isActive?: boolean;
};
// 云端MCP列表实体
export interface McpServerListDto extends CloudMcpServerListDto {
    isActive: boolean;
    tools: string[];
};

// 多模型对象列表
export type MultipleModelListDto = {
    model: string,
    supplierName: string,
    parameters?: string
}
