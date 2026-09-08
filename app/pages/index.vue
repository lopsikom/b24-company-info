<script setup lang="ts">
import {Icon} from "@iconify/vue"
import { AxiosError } from "axios";
import { initB24Frame } from "~/services/Bitrix";
import type { CompanyWithBrandData, DadataPartyData } from "~~/shared/models/ApiModels";
const onLoad = ref<boolean>(true);

const {$api} = useNuxtApp()

const isNullInfo = ref<boolean>(false);

const isError = ref<boolean>(true);
const errorText = ref<string| null>(null)
const errorData = ref<string>()

enum CompanyStatus  {
    "ACTIVE" = "Действующая",
    "LIQUIDATED" = "Ликвидирована",
    "BANKRUPT" = "Банкротство",
    "LIQUIDATING" = "Ликвидируется",
    "REORGANIZING" = "Реорганизация",
    "UNKNOWN" = "Неизвестно"
}
enum CompanyStatusColor  {
    "ACTIVE" = "#0088B0",
    "LIQUIDATING" = "red",
    "LIQUIDATED" = "red",
    "BANKRUPT" = "red",
    "REORGANIZING" = "yellow",
    "UNKNOWN" = "gray"
}

enum orgType {
    "LEGAL" = "Юридическое лицо",
    "INDIVIDUAL" = "Индивидуальный предприниматель",
    "UNKNOWN" = "Неизвестно"
}


let inn : string | null = null

const companyData = ref<CompanyWithBrandData>()
const companyInfo = computed(() => companyData.value?.data.suggestions[0] ?? null)
const companyBrand = computed(() => companyData.value?.brand?.suggestions[0] ?? null)
const companyOKVED = computed(() => companyData.value?.okved?.suggestions[0] ?? null)

const managerStartDate = computed(() => {
    if(!companyInfo.value?.data.management?.start_date) return null
    const date = new Date(companyInfo.value?.data.management?.start_date);
    return Intl.DateTimeFormat("ru-RU").format(date)
})

const companyRegistartionDate = computed(() => {
    if(!companyInfo.value?.data.state.registration_date) return null
    const date = new Date(companyInfo.value?.data.state.registration_date);
    return Intl.DateTimeFormat("ru-RU").format(date)
})

const companyRegistartionDateString = computed(() => {
    if(!companyInfo.value?.data.state.registration_date) return null
    const date = new Date(companyInfo.value?.data.state.registration_date);
    return Intl.DateTimeFormat("ru-RU").format(date)
})

onMounted(async () => {
    try{
        const handler = await initB24Frame();
        const requsites = await handler.companyRequisite()
        if(requsites.length <= 0){
            onLoad.value = false;
            isNullInfo.value = true;
            return
        }
        let noneInn = true
        for(const i of requsites){
            if(i.RQ_INN){
                inn = i.RQ_INN
                noneInn = false;
                break;
            }
        }
        if(noneInn && !inn){ 
            onLoad.value = false
            isNullInfo.value = true;
            return
        }
    }catch(e){
        console.error(e);
        isError.value = true;
        errorText.value = "Ошибка работы Bitrix SDK"
        errorData.value = String(e)
        onLoad.value = false;
        return
    }
    try{
        companyData.value = await $api.getCompanyByInn(inn!)
        if(!companyData.value.data || companyData.value.data.suggestions.length <= 0){
            isNullInfo.value = true
            onLoad.value = false
            return
        }
        onLoad.value = false
    }catch(e : unknown){
        if(e instanceof AxiosError){
            if(e.status === 404){
                onLoad.value = false;
                isNullInfo.value = true;
                
            }
        }else{
            console.error(e)
            isError.value = true;
            errorData.value = String(e)
            errorText.value = "Ошибка при работае с DaData"
            onLoad.value = false;
            return
        }
    }
})

</script>
<template>
<div class="app-container">
    <div class="load-container" v-if="onLoad">
        <Icon icon="line-md:loading-loop" class="text-blue-600"width="120"/>
    </div>
    <div class="flex gap-5" v-else-if="isNullInfo">
        <div class="flex flex-col w-[70%] gap-2">
            <p class="titleColor">Данные не найдены</p>
            <p class="text-[25px] font-semibold">Компания не найдена в базе DaData</p>
            <div class="w-[45px] h-[3px]" style="background-color: #D6006C;"></div>
        </div>
        <div class="flex flex-col">
            <p class="w-[70%]">В карточке не заполнен ИНН или компания по такому ИНН не найдена. Заполните реквизиты компании</p>
        </div>
    </div>
    <div class="flex flex-col gap-5" v-else-if="isError">
        <p class="text-[35px] titleColor">Ошибка</p>
        <p class="text-lg">{{ errorText ?? "Неизвестная ошибка" }}</p>
        <p class="backTextColor">{{ errorData }}</p>
    </div>
    <table class="tableData" v-else>
        <colgroup>
            <col style="width: 35%;">
            <col style="width: 65%;">
        </colgroup>
        <tbody>
            <tr>
                <td>
                    <div class="flex flex-col gap-2">
                        <p class="text-sm titleColor">Статус компании</p>
                        <div class="flex text-lg font-semibold items-center gap-4">
                            <div style="height: 10px; width: 10px; border-radius: 50%;" :style="`background-color: ${CompanyStatusColor[companyInfo?.data.state?.status ?? 'UNKNOWN'] }`" ></div>
                            <p>{{ CompanyStatus[companyInfo?.data.state?.status ?? 'UNKNOWN'] }}</p>
                        </div>
                        <p style="width: 70%;" class="text-sm backTextColor">Сведения на данный момент.</p>
                    </div>
                    <div class="grayLine my-[15px]"></div>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <p class="text-sm titleColor">Дата регистрации</p>
                            <p>{{ companyRegistartionDate ?? "Информация отсуствует" }}</p>
                            <p style="width: 70%;" class="text-sm backTextColor">{{ companyRegistartionDateString }}</p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="text-sm titleColor">Форма</p>
                            <p>{{ companyInfo?.data.opf.short }} {{ orgType[companyInfo?.data.type ?? "UNKNOWN"] }}</p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="text-sm titleColor">Основной ОКВЭД</p>
                            <p style="width: 70%;">{{ companyOKVED?.data.kod }} — {{ companyOKVED?.data.name }}</p>
                        </div>
                    </div>
                    <div class="grayLine my-[15px]"></div>
                </td>
                <td>
                    <div class="flex flex-col gap-5">
                        <p class="text-sm titleColor">Реквизиты</p>
                        <div class="flex gap-20">
                            <div class="flex flex-col gap-[2px]">
                                <p class="backTextColor text-sm">ИНН</p>
                                <p>{{ companyInfo?.data.inn }}</p>
                            </div>
                            <div class="flex flex-col gap-[2px]">
                                <p class="backTextColor text-sm">КПП</p>
                                <p>{{ companyInfo?.data.kpp }}</p>
                            </div>
                            <div class="flex flex-col gap-[2px]">
                                <p class="backTextColor text-sm">ОГРН</p>
                                <p>{{ companyInfo?.data.ogrn }}</p>
                            </div>
                        </div>
                        <div class="flex gap-20">
                            <div style="width: 50%;" class="flex flex-col gap-[2px]">
                                <p class="backTextColor text-sm">Юридический адрес</p>
                                <p>{{ companyInfo?.data.address.unrestricted_value }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <p class="titleColor">Руководитель и учредители</p>
                        <div class="flex gap-2 items-center">
                            <p class="text-lg">{{ companyInfo?.data.management?.name }}</p>
                            <p class="text-sm backTextColor">{{ companyInfo?.data.management?.post }} · {{ managerStartDate ? "c " + managerStartDate : '' }}</p>
                        </div>
                        <div class="blue-box">
                            <p class="text-sm font-light">{{ companyInfo?.data.name.short_with_opf }}</p>
                        </div>
                    </div>
                    <p class="my-5 titleColor">Контакты</p>
                    <div class="flex gap-5">
                        <div class="flex flex-col gap-1" v-if="companyBrand?.data.domain">
                        <p class="backTextColor">Сайт</p>
                        <a :href="'https://' + companyBrand.data.domain">{{ companyBrand?.data.domain }}</a>
                    </div>
                    <div class="flex flex-col gap-1" v-if="companyInfo?.data.phones">
                        <p class="backTextColor">Телефоны</p>
                        <p>{{ companyInfo.data.phones }}</p>
                    </div>
                    <div class="flex flex-col gap-1" v-if="companyInfo?.data.emails">
                        <p class="backTextColor">E-mail</p>
                        <a href="">{{ companyInfo?.data.emails }}</a>
                    </div>
                    </div>
                    <p class="my-5 titleColor">Информация</p>
                    <div class="flex gap-5">
                        <div class="flex flex-col gap-1" v-if="companyBrand?.data.domain">
                        <p class="backTextColor">Название</p>
                        <p>{{ companyInfo?.data.name.full_with_opf }}</p>
                        <NuxtImg class="wrapper" v-if="companyBrand.data.logo_url" :src="companyBrand.data.logo_url"/>
                    </div>
                    <div class="flex flex-col gap-1" v-if="companyInfo?.data.phones">
                        <p class="backTextColor">Телефоны</p>
                        <p>{{ companyInfo.data.phones }}</p>
                    </div>
                    <div class="flex flex-col gap-1" v-if="companyInfo?.data.emails">
                        <p class="backTextColor">E-mail</p>
                        <a href="">{{ companyInfo?.data.emails }}</a>
                    </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<style scoped>
.app-container{
    background: #F7F7F6;
    height: 100vh;
    width: 100%;
    overflow-y:scroll;
    display: flex;
    flex-direction: column;
      align-items: flex-start;     /* прижать к левому краю по горизонтали */
    justify-content: flex-start; /* прижать к верхнему краю по вертикали */
    padding: 50px 100px; 
}
.load-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.98);
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
}
.blue-box{
    padding: 2px 10px;
    background-color: #E9F8FF;
    color: #006786;
    border-radius: 10%;
    border-width: 1px;
    border-color: #99E0FF;
    width: fit-content;
}
.grayLine{
    background-color: #201E1D29;
    width: 90%;
    height: 1px;
}
.table {
  display: grid;
  grid-template-columns: minmax(70%, 1fr) repeat(2, 1fr);
  gap: 8px;
}
.tableData{
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    justify-content: start;
}
.tableData td{
    vertical-align: top;
}
.titleColor{
    color : #7D7979;
}
.backTextColor{
    color: #605D5D;
}
.wrapper {
  display: flex;
  align-items: center;      /* по вертикали */
  justify-content: center;  /* по горизонтали */
}
</style>