<#import "/spring.ftl" as spring/>
<#import "lib/sidenav.ftl" as sidenav/>
<#assign id>options</#assign>
<#assign page>
<div class="page content">
    <div class="ui grid container">
        <div class="row">
            <div class="side-nav-admin three wide column">
                <@sidenav.content id/>
            </div>
            <div class="workspace thirteen wide column">
                <div class="content">
                    <div class="ui header">基本配置</div>
                    <div class="ui hidden divider"></div>
                    <table class="ui very padded unstackable table">
                        <thead>
                        <tr>
                            <th colspan="3">基本信息</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="collapsing label">机构名称</td>
                            <td>南京天泉湖养生养老社区</td>
                            <td class="right aligned">
                                <a href="">修改</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="collapsing label">介绍</td>
                            <td>孟子曰 故天将降大任于斯人也 必先苦其心志 劳其筋骨 饿其体肤 空乏其身 行拂乱其所为 所以动心忍性 增益其所不能</td>
                            <td class="right aligned">
                                <a href="">修改</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="collapsing label">二维码</td>
                            <td>
                                <a href="">
                                    <img class="ui tiny bordered image" src="<@spring.url "/static/images/qrcode.png"/>"/>
                                </a>
                            </td>
                            <td class="right aligned collapsing">
                                <a href="">下载更多尺寸</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="collapsing label">经营主体</td>
                            <td>北京梦马教育科技有限公司</td>
                            <td class="right aligned collapsing">
                                <a href="">详情</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</#assign>
<#include "layouts/admin.ftl"/>