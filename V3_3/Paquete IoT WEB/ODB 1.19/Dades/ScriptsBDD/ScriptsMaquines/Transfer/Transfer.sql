/****** Object:  Table [dbo].[Info_Paletitzador_Transfer_Alarmes]    Script Date: 05/11/2020 18:28:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Paletitzador_Transfer_Alarmes](
	[ID] [int] NOT NULL,
	[en] [varchar](255) NULL,
	[ca] [varchar](255) NULL,
	[fr] [varchar](255) NULL,
	[es] [varchar](255) NULL,
	[grup_en] [varchar](50) NULL,
	[grup_ca] [varchar](50) NULL,
	[grup_fr] [varchar](50) NULL,
	[grup_es] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Info_Paletitzador_Transfer_Estats]    Script Date: 05/11/2020 18:28:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Paletitzador_Transfer_Estats](
	[Id] [int] NOT NULL,
	[Nom] [varchar](100) NULL,
	[Color] [varchar](100) NULL,
	[Ca] [varchar](100) NULL,
	[Es] [varchar](100) NULL,
	[En] [varchar](100) NULL,
 CONSTRAINT [PK_Info_Paletitzador_Transfer_Estats] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Info_Paletitzador_Transfer_Info]    Script Date: 05/11/2020 18:28:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Paletitzador_Transfer_Info](
	[Id] [int] NOT NULL,
	[Ca] [varchar](max) NULL,
	[Es] [varchar](max) NULL,
	[En] [varchar](max) NULL,
 CONSTRAINT [PK_Info_Paletitzador_Transfer_Info] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Info_Paletitzador_Transfer_Productes]    Script Date: 05/11/2020 18:28:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Paletitzador_Transfer_Productes](
	[Id] [int] NOT NULL,
	[Nom] [varchar](max) NOT NULL,
	[Color] [varchar](max) NULL,
 CONSTRAINT [PK_Info_Paletitzador_Transfer_Productes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO