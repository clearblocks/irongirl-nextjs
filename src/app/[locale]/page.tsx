"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/molecules";
import { ContactForm, PricingTable, ServiceCard } from "@/components/organisms";

export default function Home(): React.ReactElement {
  const tHeader = useTranslations("header");
  const tHero = useTranslations("hero");
  const tServices = useTranslations("services");
  const tWhatsapp = useTranslations("whatsappCta");
  const tAbout = useTranslations("about");
  const tMethod = useTranslations("method");
  const tContact = useTranslations("contact");
  const tPricing = useTranslations("pricing");
  const tFooter = useTranslations("footer");

  // Pricing data from Figma
  const washingItems = [
    { name: tPricing("washing.items.0.name"), price: 16.5 },
    { name: tPricing("washing.items.1.name"), price: 2.5 },
  ];

  const ironingAdultsItems = [
    { name: tPricing("ironingAdults.items.0.name"), price: 1.8 },
    { name: tPricing("ironingAdults.items.1.name"), price: 1.8 },
    { name: tPricing("ironingAdults.items.2.name"), price: 1.8 },
    { name: tPricing("ironingAdults.items.3.name"), price: 1.8 },
    { name: tPricing("ironingAdults.items.4.name"), price: 1.8 },
    { name: tPricing("ironingAdults.items.5.name"), price: 1.8 },
    { name: tPricing("ironingAdults.items.6.name"), price: 1.8 },
  ];

  const ironingChildrenItems = [
    { name: tPricing("ironingChildren.items.0.name"), price: 1.8 },
    { name: tPricing("ironingChildren.items.1.name"), price: 1.8 },
    { name: tPricing("ironingChildren.items.2.name"), price: 1.8 },
    { name: tPricing("ironingChildren.items.3.name"), price: 1.8 },
    { name: tPricing("ironingChildren.items.4.name"), price: 1.8 },
    { name: tPricing("ironingChildren.items.5.name"), price: 1.8 },
    { name: tPricing("ironingChildren.items.6.name"), price: 1.8 },
  ];

  const linensItems = [
    { name: tPricing("linens.items.0.name"), price: 2.2 },
    { name: tPricing("linens.items.1.name"), price: 3.0 },
    { name: tPricing("linens.items.2.name"), price: 2.5 },
    { name: tPricing("linens.items.3.name"), price: 3.7 },
    { name: tPricing("linens.items.4.name"), price: 1.0 },
    { name: tPricing("linens.items.5.name"), price: 3.0 },
    { name: tPricing("linens.items.6.name"), price: 1.1 },
  ];

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-[#ffc9e1] px-1 py-2 flex justify-end items-center">
        <div className="flex items-center gap-4 mr-auto ml-4">
          <div className="relative w-[41px] h-[49px]">
            <Image
              src="/images/logo.png"
              alt="Irongirl Logo"
              fill
              className="rounded-[50px] object-cover"
            />
          </div>
          <span className="font-hero text-[24px] text-primary absolute ml-10 mt-5">
            {tHeader("logoText")}
          </span>
        </div>
        <LanguageSwitcher />
      </header>

      {/* Hero */}
      <section className="relative w-full aspect-[440/180] overflow-hidden">
        <Image
          src="/images/hero-bg.png"
          alt="Hero background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white text-center">
          <div className="font-hero text-base leading-normal">
            <p className="mb-0">{tHero("line1")}</p>
            <p>{tHero("line2")}</p>
          </div>
          <div className="font-hero text-base leading-normal">
            <p className="mb-0">{tHero("line3")}</p>
            <p className="mb-0">{tHero("line4")}</p>
            <p>{tHero("line5")}</p>
          </div>
          <div className="font-hero text-xs leading-normal">
            <p className="mb-0">{tHero("phoneLabel")}</p>
            <p>{tHero("phoneNumber")}</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-6 px-5 flex flex-wrap gap-6 justify-center">
        <ServiceCard
          title={tServices("washing.title")}
          iconSrc="/images/icon-washing.png"
          iconAlt={tServices("washing.title")}
          iconWidth={42}
          iconHeight={46}
          description={tServices("washing.description")}
          buttonLabel={tServices("washing.buttonLabel")}
          onClick={() => {
            scrollToSection("about");
          }}
        />
        <ServiceCard
          title={tServices("ironing.title")}
          iconSrc="/images/icon-ironing.png"
          iconAlt={tServices("ironing.title")}
          iconWidth={57}
          iconHeight={57}
          description={tServices("ironing.description")}
          buttonLabel={tServices("ironing.buttonLabel")}
          onClick={() => {
            scrollToSection("method");
          }}
        />
        <ServiceCard
          title={tServices("contact.title")}
          iconSrc="/images/icon-contact.png"
          iconAlt={tServices("contact.title")}
          iconWidth={44}
          iconHeight={44}
          description={tServices("contact.description")}
          buttonLabel={tServices("contact.buttonLabel")}
          onClick={() => {
            scrollToSection("contact");
          }}
        />
        <ServiceCard
          title={tServices("pricing.title")}
          iconSrc="/images/icon-pricing.png"
          iconAlt={tServices("pricing.title")}
          iconWidth={53}
          iconHeight={53}
          description={tServices("pricing.description")}
          buttonLabel={tServices("pricing.buttonLabel")}
          onClick={() => {
            scrollToSection("pricing");
          }}
        />
      </section>

      {/* WhatsApp CTA */}
      <section className="relative w-full aspect-[440/310] overflow-hidden">
        <Image
          src="/images/whatsapp-cta-bg.jpg"
          alt="WhatsApp CTA background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-start p-5">
          <p className="font-sans font-medium text-2xl text-white mb-2">
            {tWhatsapp("title")}
          </p>
          <a
            href={`https://wa.me/${tWhatsapp("phoneNumber").replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-12 left-15 flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <span className="font-sans font-bold text-2xl">{tWhatsapp("buttonLabel")}</span>
          </a>
        </div>
      </section>

      {/* About Header */}
      <section
        id="about"
        className="bg-[#f2ebeb] h-[120px] flex items-center justify-center px-4 shadow-[0px_4px_4px_0px_inset_rgba(0,0,0,0.25)]"
      >
        <h2 className="font-header text-2xl text-black">{tAbout("header")}</h2>
      </section>

      {/* About Text */}
      <section className="px-5 py-6 flex flex-col gap-0">
        <div className="font-sans text-base text-black leading-normal">
          <p className="mb-0">{tAbout("intro1")}</p>
          <p className="mb-0 text-base">&nbsp;</p>
          <p className="mb-0">{tAbout("intro2")}</p>
          <p className="mb-0 text-base">&nbsp;</p>
          <p className="mb-0">{tAbout("intro3")}</p>
          <p className="mb-0 text-base">&nbsp;</p>
          <p className="mb-0">{tAbout("intro4")}</p>
          <p className="mb-0 text-base">&nbsp;</p>
          <p className="mb-0">{tAbout("intro5")}</p>
          <p className="mb-0 text-base">&nbsp;</p>
          <p>{tAbout("intro6")}</p>
        </div>
      </section>

      {/* Images 1-2 */}
      <section className="px-5">
        <div className="relative w-full aspect-[400/203]">
          <Image src="/images/ironing-board-pink.jpg" alt="Service" fill className="object-cover" />
        </div>
        <div className="relative w-full aspect-[400/281]">
          <Image src="/images/image-2.png" alt="Service" fill className="object-cover" />
        </div>
      </section>

      {/* Method Header */}
      <section
        id="method"
        className="bg-[#f2ebeb] h-[120px] flex flex-col items-center justify-center px-4"
      >
        <h2 className="font-sans text-[26px] text-black leading-normal">{tMethod("header")}</h2>
      </section>

      {/* Method Text */}
      <section className="px-5 py-5 flex flex-col gap-2 text-black">
        <ul className="font-sans text-base leading-[30px] list-disc pl-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <li key={i}>{tMethod(`steps.${i}`)}</li>
          ))}
        </ul>

        <h3 className="font-sans font-medium text-[26px] mt-4">{tMethod("washingTitle")}</h3>
        <ul className="font-sans text-base leading-[30px] list-disc pl-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>{tMethod(`washingSteps.${i}`)}</li>
          ))}
        </ul>

        <h3 className="font-sans font-medium text-[26px] mt-4">{tMethod("ironingTitle")}</h3>
        <ul className="font-sans text-base leading-[30px] list-disc pl-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>{tMethod(`ironingSteps.${i}`)}</li>
          ))}
        </ul>
      </section>

      {/* Images 3-5 */}
      <section className="flex flex-col">
        <Image
          src="/images/woman-steam-shirt.jpg"
          alt="Service"
          width={800}
          height={400}
          className="w-full h-auto"
        />
        <Image
          src="/images/image-4.png"
          alt="Service"
          width={800}
          height={400}
          className="w-full h-auto"
        />
        <Image
          src="/images/image-5.png"
          alt="Service"
          width={800}
          height={400}
          className="w-full h-auto"
        />
      </section>

      {/* Contact Header */}
      <section
        id="contact"
        className="bg-[#f2ebeb] h-[120px] flex flex-col items-center justify-center px-4"
      >
        <h2 className="font-sans text-[26px] text-black leading-normal">{tContact("header")}</h2>
      </section>

      {/* Contact Block */}
      <section className="px-5 py-2 flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-4 w-full max-w-[400px]">
          <p className="font-sans font-bold text-xl text-black">{tContact("callUs")}</p>

          <div className="flex items-center gap-2">
            <div className="relative w-[34px] h-[34px]">
              <Image
                src="/images/icon-contact.png"
                alt="Phone"
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans text-xl text-black">{tContact("phoneNumber")}</p>
          </div>

          <a
            href={tContact("googleMapsUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-[35px] h-[35px]">
              <Image
                src="/images/google-maps-icon.png"
                alt="Google Maps"
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans text-xl text-black whitespace-pre-line">
              {tContact("address")}
            </p>
          </a>

          <p className="font-sans font-bold text-xl text-black mt-2">{tContact("formTitle")}</p>

          <ContactForm />
        </div>
      </section>

      {/* Images 6-7 */}
      <section className="flex flex-col">
        <Image
          src="/images/image-6.png"
          alt="Service"
          width={800}
          height={400}
          className="w-full h-auto"
        />
        <Image
          src="/images/steamer-pink-shirt-cropped.jpg"
          alt="Service"
          width={800}
          height={400}
          className="w-full h-auto"
        />
      </section>

      {/* Pricing Header */}
      <section
        id="pricing"
        className="bg-[#f2ebeb] h-[200px] flex flex-col items-center justify-center px-20 py-11 gap-4"
      >
        <h2 className="font-sans text-[26px] text-black leading-normal text-center">
          {tPricing("header")}
        </h2>
        <p className="font-sans text-xl text-black text-center">{tPricing("paymentNote")}</p>
      </section>

      {/* Pricing Tables */}
      <section className="px-10 py-5 flex flex-col gap-2 items-center">
        <PricingTable title={tPricing("washing.title")} priceItems={washingItems} />

        <PricingTable
          title={tPricing("ironingAdults.title")}
          subtitle={tPricing("ironingAdults.subtitle")}
          priceItems={ironingAdultsItems}
        />

        <PricingTable
          subtitle={tPricing("ironingChildren.subtitle")}
          priceItems={ironingChildrenItems}
        />

        <PricingTable subtitle={tPricing("linens.subtitle")} priceItems={linensItems} />
      </section>

      {/* Images 8-9 */}
      <section className="flex flex-col">
        <Image
          src="/images/image-8.png"
          alt="Service"
          width={800}
          height={400}
          className="w-full h-auto"
        />
        <Image
          src="/images/image-9.png"
          alt="Service"
          width={800}
          height={400}
          className="w-full h-auto"
        />
      </section>

      {/* Footer */}
      <footer className="bg-[#f2ebeb] h-[150px] flex flex-col items-center justify-center px-2 py-5 gap-2">
        <p className="font-sans text-base text-black text-center leading-[30px]">
          {tFooter("copyright")}
          <br />
          {tFooter("address")}
        </p>
        <a
          href={tFooter("googleMapsUrl")}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <div className="relative w-[44px] h-[43px]">
            <Image
              src="/images/google-maps-icon.png"
              alt="Google Maps"
              fill
              className="object-cover"
            />
          </div>
        </a>
      </footer>
    </div>
  );
}
