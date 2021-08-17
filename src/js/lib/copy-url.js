export async function copyLink(event) {
  if (!navigator.clipboard) {
    alert(
      "Sorry your browser doesn't allow copying. You'll have to do it manualy instead"
    );
    return;
  }

  const link = event.target.previousElementSibling.textContent;
  try {
    await navigator.clipboard.writeText(link);
    event.target.textContent = "Copied!";
    event.target.style.backgroundColor = " var(--clr-primary-200)";
  } catch (error) {
    console.error("Failed to copy!", error);
  }
}
