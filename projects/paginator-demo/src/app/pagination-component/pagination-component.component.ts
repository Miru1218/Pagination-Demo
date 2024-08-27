import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination-component.component.html',
  styleUrls: ['./pagination-component.component.css']
})
export class PaginationComponentComponent {
  @Input() page = 1; // 當前頁碼，預設為 1
  @Input() pageCount = 1; // 總頁數，預設為 1
  @Output() pageChange = new EventEmitter<number>(); // 當頁碼變更時，發出頁碼的事件

  currentPage = 1; // 當前顯示的頁碼
  previousPage = 1; // 前一頁的頁碼
  nextPage = 1; // 下一頁的頁碼

  ngOnInit() {
    this.updatePageNumbers(); // 初始化時更新頁碼
  }

  jumpTo(num: number) {
    // 若頁碼不在合理範圍內，則不執行跳轉
    if (num < 1 || num > this.pageCount) {
      return;
    }

    this.currentPage = num; // 設定當前頁碼

    // 發出頁碼變更事件，將新的頁碼傳遞出去
    this.pageChange.emit(num);

    this.updatePageNumbers(); // 更新前一頁和下一頁的頁碼
  }

  goPrevious() {
    this.jumpTo(this.currentPage - 1); // 跳轉到前一頁
  }

  goNext() {
    this.jumpTo(this.currentPage + 1); // 跳轉到下一頁
  }

  private updatePageNumbers() {
    // 更新前一頁和下一頁的頁碼，確保頁碼不超出範圍
    this.previousPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
    this.nextPage = this.currentPage < this.pageCount ? this.currentPage + 1 : this.pageCount;
  }
}
