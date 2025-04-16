export function CopyrightFooter() {
  return (
    <div className="footer sm:footer-horizontal footer-center bg-light-base-400 text-base-content dark:bg-base-400 p-4">
      <aside className="flex w-full flex-col items-center justify-between px-12 lg:flex-row">
        <p className="text-base-content/70 dark:text-base-content/60">
          Copyright © {new Date().getFullYear()} PhD ONTU. При використанні
          матеріалів сайту гіперпосилання на ресурс обов&#39;язкове.
        </p>
        <p className="text-base-content/70 dark:text-base-content/60 text-right">
          Розроблено з любов&#39;ю у рамках кваліфікаційної роботи - Сергій
          Прізвище, Зігура Таміла
          <br />
          Авторка ідеї - Ольга Ольшевська
        </p>
      </aside>
    </div>
  );
}
