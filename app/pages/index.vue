<script setup lang="ts">
import {Icon} from "@iconify/vue"
import { initB24Frame } from "~/services/Bitrix";
const onLoad = ref<boolean>(true);

const {$api} = useNuxtApp()

onMounted(async () => {
    const handler = await initB24Frame();
    const requsites = await handler.companyRequisite()
    if(requsites.length <= 0){
        onLoad.value = false;
        return
    }
})

</script>
<template>
<div class="app-container">
    <div class="load-container" v-if="onLoad">
        <Icon icon="line-md:loading-loop" class="text-blue-600"width="120"/>
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
                            <div style="height: 10px; width: 10px; border-radius: 50%; background-color: aquamarine;"></div>
                            <p>Действующая</p>
                        </div>
                        <p style="width: 70%;" class="text-sm backTextColor">Сведения о недостоверности не внесены. Проверено 31.08.2026.</p>
                    </div>
                    <div class="grayLine my-[15px]"></div>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <p class="text-sm titleColor">Дата регистрациии</p>
                            <p>14 марта 2015</p>
                            <p style="width: 70%;" class="text-sm backTextColor">11 лет 5 месяцев на рынке</p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="text-sm titleColor">Форма</p>
                            <p>ООО коммерческая</p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="text-sm titleColor">Основной ОКВЭД</p>
                            <p style="width: 70%;">46.90 — Торговля оптовая неспециализированная</p>
                        </div>
                    </div>
                    <div class="grayLine my-[15px]"></div>
                </td>
                <td>
                    <div class="flex flex-col gap-5">
                        <p class="text-sm titleColor">Реквезиты</p>
                        <div class="flex gap-20">
                            <div class="flex flex-col gap-[2px]">
                                <p class="backTextColor text-sm">ИНН</p>
                                <p>7707083893</p>
                            </div>
                            <div class="flex flex-col gap-[2px]">
                                <p class="backTextColor text-sm">КПП</p>
                                <p>7707083893</p>
                            </div>
                            <div class="flex flex-col gap-[2px]">
                                <p class="backTextColor text-sm">ОГРН</p>
                                <p>7707083893</p>
                            </div>
                        </div>
                        <div class="flex gap-20">
                            <div style="width: 50%;" class="flex flex-col gap-[2px]">
                                <p class="backTextColor text-sm">Юридический адрес</p>
                                <p>109012, г. Москва, ул. Ильинка, д. 4, эт. 5, оф. 512</p>
                            </div>
                            <div style="width: 50%;" class="flex flex-col gap-[2px]">
                                <p class="backTextColor text-sm">Фактический адрес</p>
                                <p>143404, МО, г. Красногорск, Ильинский б-р, д. 4, стр. 2</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <p class="titleColor">Руководитель и учредители</p>
                        <div class="flex gap-2 items-center">
                            <p class="text-lg">Смирнова Анна Петровна</p>
                            <p class="text-sm backTextColor">Генеральный директор · с 12.09.2019</p>
                        </div>
                        <div class="blue-box">
                            <p class="text-sm font-light">ИНН 771234567890</p>
                        </div>
                    </div>
                    <div class="table my-[10px]">
                        <div>Смирнова Анна Петровна</div>
                        <div class="backTextColor">60 %</div>
                        <div class="backTextColor">720 000 ₽</div>
                    </div>
                    <p class="my-5 titleColor">Контакты</p>
                    <div class="flex gap-5">
                        <div class="flex flex-col gap-1">
                        <p class="backTextColor">Сайт</p>
                        <link>romashka-trade.ru</link>
                    </div>
                    <div class="flex flex-col gap-1">
                        <p class="backTextColor">Телефоны</p>
                        <p>+7 495 120-34-56</p>
                        <p class="backTextColor">+7 800 555-01-22</p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <p class="backTextColor">E-mail</p>
                        <a href="">info@romashka-trade.ru</a>
                        <a class="backTextColor">info@romashka-trade.ru</a>
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
</style>