import svgPaths from "./svg-vb1g52n5sn";
import imgAb6AXuAp6EpCrp41BeBjOtgfRaP0PIRvNm2P8T8JTaChgDaC90ANd2YOrAugV2Q6J21QpNo6HL9QuiStu0MyGDcYqKd34J8IfwQxUEHUrThQBoZasiqLznox07Ap7MggiAefyw86KO63Oe26M5LlqmXrqIw0ToulVv7VHmRuuzRgz1EkJslFeudBXenYd90Tu8Cb8Jbj9GMa9MfdEkxDsfWkbY2SlVhhsV5Dt7YIYl8By2NhK5T2QtFsg6HanyOjD250J0Kmgy from "./df37a81d2a09d636558e899eded7246f9de27c6d.png";
import imgAb6AXuAyQ4MwQ0Ceofbqu7DQcA0Lx36JQkPrlFawtOyu4VScf6TGcXpvqUPkiPwb18Ys6K21XFgTuZTxdng8ZvTgYhXXwjE0AYjkhNg4LtSooezeBiAzZtEjt5Aru9GNdOce1UhIJuqSj4CmIjsCVhZAhkoG1BocKpr3KjVwZ79KPv6Tq94GI9UIm9GeagyKdFCj4AoghIcpUl22TcAjYxfiNghpuXceOUuvsGvu3TlIieJSquaxu32UbgChVejxVn7PQv2Dic from "./1c88e7a08ac6736998088eb873aee61f41310cb1.png";

function Background() {
  return (
    <div className="bg-[#1b263b] content-stretch flex items-center justify-center pb-[4.5px] pt-[3.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">1</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Heading 2">
      <Background />
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Thông tin khách hàng</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[658px]" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Họ và tên</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">Nguyễn Văn A</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[17px] py-[15px] relative size-full">
          <Container1 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(117,119,125,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col gap-[4px] items-end justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[319px]" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Số điện thoại</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">090 123 4567</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[17px] py-[15px] relative size-full">
          <Container3 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(117,119,125,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] items-end justify-self-stretch relative row-2 self-start shrink-0" data-name="Container">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[319px]" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Email (Không bắt buộc)</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">example@email.com</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[17px] py-[15px] relative size-full">
          <Container5 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(117,119,125,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] items-end justify-self-stretch relative row-2 self-start shrink-0" data-name="Container">
      <Label2 />
      <Input2 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[658px]" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Địa chỉ giao hàng</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">Số nhà, tên đường, Phường/Xã...</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[17px] py-[15px] relative size-full">
          <Container7 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(117,119,125,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col gap-[4px] items-end justify-self-stretch relative row-3 self-start shrink-0" data-name="Container">
      <Label3 />
      <Input3 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[658px]" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Ghi chú đơn hàng</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[24px]">Ví dụ: Giao giờ hành chính, gọi trước khi đến...</p>
        </div>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="flex flex-row justify-center overflow-auto rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[61px] pt-[13px] px-[17px] relative size-full">
          <Container9 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(117,119,125,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col gap-[4px] items-end justify-self-stretch pb-[6px] relative row-4 self-start shrink-0" data-name="Container">
      <Label4 />
      <Textarea />
    </div>
  );
}

function Form() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[____78px_78px_78px_132px] relative shrink-0 w-full" data-name="Form">
      <Container />
      <Container2 />
      <Container4 />
      <Container6 />
      <Container8 />
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section">
      <Heading />
      <Form />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#1b263b] content-stretch flex items-center justify-center pb-[4.5px] pt-[3.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">2</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Heading 2">
      <Background1 />
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Phương thức thanh toán</p>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="image">
          <path d={svgPaths.p3b2c3a40} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#051125] mr-[-1px] relative rounded-[20px] shrink-0 size-[22px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Image />
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[15.058px] relative shrink-0 w-[21.308px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3076 15.0576">
        <g id="Container">
          <path d={svgPaths.p3abab80} fill="var(--fill-0, #051125)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#001d36] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Thanh toán khi nhận hàng (COD)</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[16px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Label">
      <div aria-hidden className="absolute border border-[rgba(117,119,125,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[323.27px] py-[17px] relative size-full">
          <Input4 />
          <Margin />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[18.942px] relative shrink-0 w-[18.461px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.4614 18.9422">
        <g id="Container">
          <path d={svgPaths.pd19dfc0} fill="var(--fill-0, #051125)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#001d36] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Chuyển khoản ngân hàng (Đang bảo trì)</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[16px] relative size-full">
        <Container14 />
      </div>
    </div>
  );
}

function Label6() {
  return (
    <div className="bg-white opacity-60 relative rounded-[12px] shrink-0 w-full" data-name="Label">
      <div aria-hidden className="absolute border border-[rgba(117,119,125,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[17px] relative size-full">
          <div className="bg-white relative rounded-[20px] shrink-0 size-[20px]" data-name="Input">
            <div aria-hidden className="absolute border border-[rgba(117,119,125,0.3)] border-solid inset-0 pointer-events-none rounded-[20px]" />
          </div>
          <Margin1 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Label6 />
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section">
      <Heading1 />
      <Container10 />
    </div>
  );
}

function LeftColumnCustomerInfo() {
  return (
    <div className="col-[1/span_7] content-stretch flex flex-col gap-[48px] items-start justify-self-stretch pb-[23px] pt-[48px] relative row-1 self-start shrink-0" data-name="Left Column: Customer Info">
      <Section />
      <Section1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] w-full">
          <p className="leading-[24px]">Tóm tắt đơn hàng</p>
        </div>
      </div>
    </div>
  );
}

function Ab6AXuAp6EpCrp41BeBjOtgfRaP0PIRvNm2P8T8JTaChgDaC90ANd2YOrAugV2Q6J21QpNo6HL9QuiStu0MyGDcYqKd34J8IfwQxUEHUrThQBoZasiqLznox07Ap7MggiAefyw86KO63Oe26M5LlqmXrqIw0ToulVv7VHmRuuzRgz1EkJslFeudBXenYd90Tu8Cb8Jbj9GMa9MfdEkxDsfWkbY2SlVhhsV5Dt7YIYl8By2NhK5T2QtFsg6HanyOjD250J0Kmgy() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="AB6AXuAP6EpCRP41beBjOtgfRaP0pIRvNm2P8T8JTaCHGDaC90aNd2yORAug-v2q6j21qpNo6hL9qui_stu0My-gDcYqKD34j8IfwQX_U-eHUrThQBoZasiqLznox07Ap7MggiAefyw86k-o63oe26M5LlqmXRQIw0toulVV7vHmRuuzRgz1ekJsl_FeudBXenYd90Tu8cb8Jbj9GMa9-_mfdEKXDsfWkbY2slVhhs_V5Dt7yIYl8by2NhK5t2qtFsg6HANYOjD250J0kmgy">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-10%] max-w-none top-0 w-[120%]" src={imgAb6AXuAp6EpCrp41BeBjOtgfRaP0PIRvNm2P8T8JTaChgDaC90ANd2YOrAugV2Q6J21QpNo6HL9QuiStu0MyGDcYqKd34J8IfwQxUEHUrThQBoZasiqLznox07Ap7MggiAefyw86KO63Oe26M5LlqmXrqIw0ToulVv7VHmRuuzRgz1EkJslFeudBXenYd90Tu8Cb8Jbj9GMa9MfdEkxDsfWkbY2SlVhhsV5Dt7YIYl8By2NhK5T2QtFsg6HanyOjD250J0Kmgy} />
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex flex-col h-[96px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[80px]" data-name="Background">
      <Ab6AXuAp6EpCrp41BeBjOtgfRaP0PIRvNm2P8T8JTaChgDaC90ANd2YOrAugV2Q6J21QpNo6HL9QuiStu0MyGDcYqKd34J8IfwQxUEHUrThQBoZasiqLznox07Ap7MggiAefyw86KO63Oe26M5LlqmXrqIw0ToulVv7VHmRuuzRgz1EkJslFeudBXenYd90Tu8Cb8Jbj9GMa9MfdEkxDsfWkbY2SlVhhsV5Dt7YIYl8By2NhK5T2QtFsg6HanyOjD250J0Kmgy />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] w-full">
        <p className="leading-[24px]">Áo Blazer Dạ Cao Cấp</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px]">Navy / Size L</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#001d36] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">x1</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#051125] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">1.250.000đ</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start justify-between py-[4px] relative size-full">
        <Container18 />
        <Container20 />
      </div>
    </div>
  );
}

function ProductItem() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Product Item 1">
      <Background2 />
      <Container17 />
    </div>
  );
}

function Ab6AXuAyQ4MwQ0Ceofbqu7DQcA0Lx36JQkPrlFawtOyu4VScf6TGcXpvqUPkiPwb18Ys6K21XFgTuZTxdng8ZvTgYhXXwjE0AYjkhNg4LtSooezeBiAzZtEjt5Aru9GNdOce1UhIJuqSj4CmIjsCVhZAhkoG1BocKpr3KjVwZ79KPv6Tq94GI9UIm9GeagyKdFCj4AoghIcpUl22TcAjYxfiNghpuXceOUuvsGvu3TlIieJSquaxu32UbgChVejxVn7PQv2Dic() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="AB6AXuAyQ4MwQ0Ceofbqu7DQcA0Lx36JQkPRLFawtOYU4-vSCF6tGcXpvqUPkiPWB18ys6-k21XFgTuZ-TXDNG8ZvTgYhXXwjE0aYjkhNG4ltSOOEZEBiAzZTEjt5ARU9_gNdOCE1uhIJuqSj4cmIjsCVhZAhkoG1BocKpr3KjVwZ79kPv6TQ94g_I9-uIm9-geagyKd-FCj4AoghIcpUl22tcAjYxfiNghpuXCE_OUuvsGVU3TLIieJ_SQUAXU32ubgCHVejxVn7pQV2dic">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-10%] max-w-none top-0 w-[120%]" src={imgAb6AXuAyQ4MwQ0Ceofbqu7DQcA0Lx36JQkPrlFawtOyu4VScf6TGcXpvqUPkiPwb18Ys6K21XFgTuZTxdng8ZvTgYhXXwjE0AYjkhNg4LtSooezeBiAzZtEjt5Aru9GNdOce1UhIJuqSj4CmIjsCVhZAhkoG1BocKpr3KjVwZ79KPv6Tq94GI9UIm9GeagyKdFCj4AoghIcpUl22TcAjYxfiNghpuXceOUuvsGvu3TlIieJSquaxu32UbgChVejxVn7PQv2Dic} />
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex flex-col h-[96px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[80px]" data-name="Background">
      <Ab6AXuAyQ4MwQ0Ceofbqu7DQcA0Lx36JQkPrlFawtOyu4VScf6TGcXpvqUPkiPwb18Ys6K21XFgTuZTxdng8ZvTgYhXXwjE0AYjkhNg4LtSooezeBiAzZtEjt5Aru9GNdOce1UhIJuqSj4CmIjsCVhZAhkoG1BocKpr3KjVwZ79KPv6Tq94GI9UIm9GeagyKdFCj4AoghIcpUl22TcAjYxfiNghpuXceOUuvsGvu3TlIieJSquaxu32UbgChVejxVn7PQv2Dic />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] w-full">
        <p className="leading-[24px]">Giày Loafer Da Thật</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px]">Tan / Size 42</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#001d36] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">x1</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#051125] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">2.100.000đ</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end justify-between relative size-full">
          <Container27 />
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start justify-between py-[4px] relative size-full">
        <Container24 />
        <Container26 />
      </div>
    </div>
  );
}

function ProductItem1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Product Item 2">
      <Background3 />
      <Container23 />
    </div>
  );
}

function CartItems() {
  return (
    <div className="max-h-[400px] relative shrink-0 w-full" data-name="Cart Items">
      <div className="max-h-[inherit] overflow-auto rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start max-h-[inherit] pr-[8px] relative size-full">
          <ProductItem />
          <ProductItem1 />
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">Mã giảm giá</p>
        </div>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-[#f8f9ff] flex-[1_0_0] min-w-px relative rounded-[8px] self-stretch" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[17px] py-[11px] relative size-full">
          <Container29 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(117,119,125,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#7d562d] content-stretch flex flex-col items-center justify-center px-[24px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Áp dụng</p>
      </div>
    </div>
  );
}

function PromoCode() {
  return (
    <div className="relative shrink-0 w-full" data-name="Promo Code">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start pt-[8px] relative size-full">
        <Input5 />
        <Button />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Tạm tính</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">3.350.000đ</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Phí vận chuyển</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Miễn phí</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#051125] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Tổng cộng</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#051125] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">3.350.000đ</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pt-[8px] relative size-full">
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function CostSummary() {
  return (
    <div className="relative shrink-0 w-full" data-name="Cost Summary">
      <div aria-hidden className="absolute border-[rgba(117,119,125,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pb-[8px] pt-[33px] relative size-full">
        <Container30 />
        <Container33 />
        <Container36 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">ĐẶT HÀNG</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9999 14.9999">
        <g id="Container">
          <path d={svgPaths.p19722680} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function CtaButton() {
  return (
    <div className="bg-[#051125] relative rounded-[12px] shrink-0 w-full" data-name="CTA Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center justify-center py-[16px] relative size-full">
        <Container39 />
        <Container40 />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="-translate-x-1/2 absolute h-[44px] left-[calc(50%+45.61px)] top-[2px] w-[302.11px]" data-name="Link">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%+108.46px)] top-[10px]">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[24px] underline">Điều khoản</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%-101.41px)] top-[34px]">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[24px] underline">{`& Chính sách`}</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid font-['Inter:Italic',sans-serif] font-normal italic leading-[0] relative size-full text-[#45474d] text-[16px] text-center whitespace-nowrap">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%-42.61px)] top-[12px]">
          <p className="leading-[24px]">{`Bằng cách đặt hàng, bạn đồng ý với các `}</p>
        </div>
        <Link />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%+49.63px)] top-[36px]">
          <p className="leading-[24px]">{` của chúng tôi.`}</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white drop-shadow-[0px_10px_15px_rgba(27,38,59,0.05)] relative rounded-[16px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-[rgba(117,119,125,0.05)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[33px] relative size-full">
        <Heading2 />
        <CartItems />
        <PromoCode />
        <CostSummary />
        <CtaButton />
        <Container41 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[15.785px] relative shrink-0 w-[12.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4999 15.7852">
        <g id="Container">
          <path d={svgPaths.p52e700} fill="var(--fill-0, #45474D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[24px]">THANH TOÁN AN TOÀN</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative self-stretch shrink-0" data-name="Container">
      <Container43 />
      <Container44 />
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[14.461px] relative shrink-0 w-[12.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4999 14.4615">
        <g id="Container">
          <path d={svgPaths.pccbcd80} fill="var(--fill-0, #45474D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[24px]">ĐỔI TRẢ 30 NGÀY</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative self-stretch shrink-0" data-name="Container">
      <Container46 />
      <Container47 />
    </div>
  );
}

function SafetyBadges() {
  return (
    <div className="content-stretch flex gap-[23.99px] h-[24px] items-start justify-center relative shrink-0 w-full" data-name="Safety Badges">
      <Container42 />
      <Container45 />
    </div>
  );
}

function AsideRightColumnOrderSummaryCartItems() {
  return (
    <div className="col-[8/span_5] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Aside - Right Column: Order Summary & Cart Items">
      <BackgroundBorderShadow />
      <SafetyBadges />
    </div>
  );
}

function Main() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_773px] relative shrink-0 w-[1152px]" data-name="Main">
      <LeftColumnCustomerInfo />
      <AsideRightColumnOrderSummaryCartItems />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[320px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Cửa hàng thời trang cao cấp với</p>
        <p className="leading-[24px] mb-0">các sản phẩm được tuyển chọn kỹ</p>
        <p className="leading-[24px] mb-0">lưỡng cho phong cách tối giản và</p>
        <p className="leading-[24px]">tinh tế.</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16.5px] items-start min-w-px relative" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">BOUTIQUE</p>
      </div>
      <Container50 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] w-full">
        <p className="leading-[24px]">Shop Info</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px]">Về chúng tôi</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px]">Hệ thống cửa hàng</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px]">Tuyển dụng</p>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px pb-[9px] relative" data-name="Container">
      <Heading5 />
      <List />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] w-full">
        <p className="leading-[24px]">Policies</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px]">Chính sách vận chuyển</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px]">Chính sách đổi trả</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px]">Bảo mật thông tin</p>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="List">
      <Item3 />
      <Item4 />
      <Item5 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px pb-[9px] relative" data-name="Container">
      <Heading6 />
      <List1 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] w-full">
        <p className="leading-[24px]">Kết nối</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="h-[19px] relative shrink-0 w-[21px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9999 18.9999">
          <path d={svgPaths.p37689100} fill="var(--fill-0, #45474D)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="h-[17px] relative shrink-0 w-[19px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.9999 16.9999">
          <path d={svgPaths.p9646640} fill="var(--fill-0, #45474D)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="relative shrink-0 size-[18.5px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.4999 18.4999">
          <path d={svgPaths.p38e59900} fill="var(--fill-0, #45474D)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex gap-[16px] h-[19px] items-start relative shrink-0 w-full" data-name="Container">
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] w-full">
        <p className="leading-[24px] mb-0">© 2024 BOUTIQUE. All rights</p>
        <p className="leading-[24px]">reserved.</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px pb-[3px] relative" data-name="Container">
      <Heading7 />
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container48() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start justify-center max-w-[inherit] px-[64px] relative size-full">
          <Container49 />
          <Container51 />
          <Container52 />
          <Container53 />
        </div>
      </div>
    </div>
  );
}

function FooterComponent() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex flex-col items-start pb-[80px] pt-[81px] relative shrink-0 w-full" data-name="Footer Component">
      <div aria-hidden className="absolute border-[rgba(117,119,125,0.05)] border-solid border-t inset-0 pointer-events-none" />
      <Container48 />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#051125] text-[16px] tracking-[-0.8px] whitespace-nowrap">
        <p className="leading-[24px]">BOUTIQUE</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Giỏ hàng</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c5c6cd] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">/</p>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[6px] relative shrink-0" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#7d562d] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#051125] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Thanh toán</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Link5 />
      <Container58 />
      <HorizontalBorder />
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 size-[13.308px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3076 13.3076">
        <g id="Container">
          <path d={svgPaths.p1cf2cf80} fill="var(--fill-0, #45474D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Thoát</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Link">
      <Container59 />
      <Container60 />
    </div>
  );
}

function Container56() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] px-[64px] relative size-full">
          <Link4 />
          <Container57 />
          <Link6 />
        </div>
      </div>
    </div>
  );
}

function HeaderTopNavBarSuppressedAsPerTheDestinationRuleForFocusedCheckout() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(248,249,255,0.8)] content-stretch flex flex-col items-start left-0 py-[16px] shadow-[0px_10px_30px_0px_rgba(27,38,59,0.05)] top-0 w-[1280px]" data-name="Header - TopNavBar (Suppressed as per 'The Destination Rule' for Focused Checkout)">
      <Container56 />
    </div>
  );
}

export default function GiHangThanhToanBoutique() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center pb-px pt-[96px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Giỏ hàng & Thanh toán - BOUTIQUE">
      <Main />
      <FooterComponent />
      <HeaderTopNavBarSuppressedAsPerTheDestinationRuleForFocusedCheckout />
    </div>
  );
}