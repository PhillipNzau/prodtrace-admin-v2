

export interface PpuInterface {
  date_applied: string;
  farm_id: string;
  ppu_data: {
    id: number;
    trade_name: string;
    phi_days: number;
  };
  end_date: string
}
