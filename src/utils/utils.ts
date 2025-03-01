import { CONSTANT } from "../const/constant";
import { IJsonContact } from "../type/contact";

export class CommonUtil {
  static getLocalStorage(key: string) {
    if (localStorage.getItem(CONSTANT.LS_CONTACT)) {
      return JSON.parse(localStorage.getItem(key) ?? "");
    } else {
      return null;
    }
  }

  static setLocalStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  static formJson<T>(obj: T) {
    const formJson = [];
    for (const [key, val] of Object.entries(obj as any)) {
      if ("firstname" === key) {
        formJson.push({
          Tag: 100,
          Subfield: "a",
          Value: val,
        });
      }
      if ("lastname" === key) {
        formJson.push({
          Tag: 100,
          Subfield: "b",
          Value: val,
        });
      }
      if ("company" === key) {
        formJson.push({
          Tag: 100,
          Subfield: "c",
          Value: val,
        });
      }
      if ("phone" === key) {
        formJson.push({
          Tag: 270,
          Subfield: "a",
          Value: val,
        });
      }
      if ("email" === key) {
        formJson.push({
          Tag: 270,
          Subfield: "b",
          Value: val,
        });
      }
      if ("address" === key) {
        formJson.push({
          Tag: 272,
          Subfield: "#",
          Value: val,
        });
      }
      if ("street" === key) {
        formJson.push({
          Tag: 272,
          Subfield: "a",
          Value: val,
        });
      }
      if ("district" === key) {
        formJson.push({
          Tag: 272,
          Subfield: "b",
          Value: val,
        });
      }
      if ("city" === key) {
        formJson.push({
          Tag: 272,
          Subfield: "c",
          Value: val,
        });
      }
    }
    return JSON.stringify(formJson);
  }

  static downloadFile(myData: string) {
    // create file in browser
    const parseData = JSON.parse(myData);
    const lastname = parseData.find(
      (c: IJsonContact) => c.Tag === 100 && c.Subfield === "b"
    );

    const fileName =
      (lastname?.Value ?? Date.now().toString()) +
      "_contact_" +
      Date.now().toString();

    const json = JSON.stringify(myData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
}
